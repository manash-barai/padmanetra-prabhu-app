import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { MiniPlayer } from '../components/MiniPlayer';
import { COLORS, SHADOWS } from '../constants/colors';
import { apiGetAudios } from '../services/apiService';
import { AudioItem } from '../types';
import { usePlayerStore } from '../store/usePlayerStore';

const CATEGORIES = ['All', 'Bhagavatam', 'Kirtan', 'Lectures', 'Seminar', 'Q&A'];

export const AudioLibraryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);

  useEffect(() => {
    loadAudios();
  }, [activeCategory, searchQuery]);

  const loadAudios = async () => {
    try {
      setLoading(true);
      const data = await apiGetAudios(activeCategory, searchQuery);
      setAudios(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (audio: AudioItem) => {
    Alert.alert('Download Started', `Downloading "${audio.title}" for offline listening.`);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Audio Library"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showSearch
        onSearch={() => {}}
        showFilter
        onFilter={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar & Filter Button */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={18} color="#8D6E63" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search audio, topics or keywords..."
              placeholderTextColor="#A1887F"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color="#8D6E63" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="funnel-outline" size={16} color="#D97706" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Horizontal Pills */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <TouchableOpacity onPress={() => setActiveCategory('All')}>
              <Text style={styles.viewAllText}>View All &gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryPill,
                    isSelected && styles.categoryPillActive,
                  ]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryPillText,
                      isSelected && styles.categoryPillTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Audio Track List */}
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <View style={styles.audioList}>
            {audios.map((audio) => {
              const isThisPlaying = currentTrack?.id === audio.id && isPlaying;
              return (
                <View key={audio.id} style={styles.audioCard}>
                  {/* Thumbnail / Play Button */}
                  <TouchableOpacity
                    style={styles.thumbnailWrapper}
                    onPress={() => {
                      if (currentTrack?.id === audio.id) {
                        togglePlayPause();
                      } else {
                        playTrack(audio);
                      }
                    }}
                  >
                    <Image
                      source={{ uri: audio.thumbnail }}
                      style={styles.thumbnail}
                    />
                    <View style={styles.playOverlay}>
                      <Ionicons
                        name={isThisPlaying ? 'pause' : 'play'}
                        size={20}
                        color="#FFFFFF"
                        style={{ marginLeft: isThisPlaying ? 0 : 2 }}
                      />
                    </View>
                    <View style={styles.durationTag}>
                      <Text style={styles.durationText}>{audio.duration}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Info Column */}
                  <TouchableOpacity
                    style={styles.infoCol}
                    onPress={() => playTrack(audio)}
                  >
                    <Text style={styles.audioTitle} numberOfLines={1}>
                      {audio.title}
                    </Text>
                    <Text style={styles.speakerText}>{audio.speaker}</Text>

                    <View style={styles.metaRow}>
                      <Ionicons name="calendar-outline" size={10} color="#8D6E63" />
                      <Text style={styles.metaText}>{audio.date}</Text>
                      <Ionicons name="headset-outline" size={10} color="#8D6E63" style={{ marginLeft: 6 }} />
                      <Text style={styles.metaText}>{audio.plays}</Text>
                    </View>

                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{audio.category}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Actions Column: Download & More */}
                  <View style={styles.actionsCol}>
                    <TouchableOpacity
                      style={styles.actionIconBtn}
                      onPress={() => {}}
                    >
                      <Ionicons name="ellipsis-vertical" size={16} color="#8D6E63" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionIconBtn}
                      onPress={() => handleDownload(audio)}
                    >
                      <Ionicons
                        name={audio.isDownloaded ? 'checkmark-circle' : 'download-outline'}
                        size={20}
                        color={audio.isDownloaded ? '#059669' : '#D97706'}
                      />
                      <Text style={styles.downloadLabel}>
                        {audio.isDownloaded ? 'Saved' : 'Download'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom Mini Player (Page 14) */}
      <MiniPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  scrollContent: {
    paddingBottom: 70,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#F3E5D8',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#3E2723',
    marginLeft: 8,
    padding: 0,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginLeft: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  categoriesSection: {
    marginTop: 12,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoriesTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3E2723',
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F3E5D8',
  },
  categoryPillActive: {
    backgroundColor: '#E65100',
    borderColor: '#E65100',
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B4E3D',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  loader: {
    paddingVertical: 40,
  },
  audioList: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  audioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  thumbnailWrapper: {
    width: 66,
    height: 66,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFF3E0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(230, 81, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationTag: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  infoCol: {
    flex: 1,
    marginLeft: 12,
  },
  audioTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#3E2723',
  },
  speakerText: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '600',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  metaText: {
    fontSize: 9,
    color: '#8D6E63',
    marginLeft: 3,
  },
  categoryBadge: {
    backgroundColor: '#FFF9E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  categoryBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#B45309',
  },
  actionsCol: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginLeft: 8,
  },
  actionIconBtn: {
    alignItems: 'center',
  },
  downloadLabel: {
    fontSize: 8,
    color: '#8D6E63',
    fontWeight: '600',
    marginTop: 1,
  },
});
