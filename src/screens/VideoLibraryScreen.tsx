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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { COLORS, SHADOWS } from '../constants/colors';
import { apiGetVideos } from '../services/apiService';
import { VideoItem } from '../types';

const CATEGORIES = ['All', 'Bhagavatam', 'House Program', 'Festival', 'Seminar', 'Q&A'];

export const VideoLibraryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, [activeCategory, searchQuery]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await apiGetVideos(activeCategory, searchQuery);
      setVideos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Video Library"
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
              placeholder="Search videos, topics or keywords..."
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

        {/* Video List */}
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <View style={styles.videosList}>
            {videos.map((vid) => (
              <TouchableOpacity
                key={vid.id}
                style={styles.videoCard}
                onPress={() => navigation.navigate('VideoDetails', { id: vid.id })}
                activeOpacity={0.88}
              >
                {/* Thumbnail with duration */}
                <View style={styles.thumbWrapper}>
                  <Image source={{ uri: vid.thumbnail }} style={styles.thumbnail} />
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{vid.duration}</Text>
                  </View>
                </View>

                {/* Info Column */}
                <View style={styles.infoCol}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {vid.title}
                  </Text>
                  <Text style={styles.speakerText}>{vid.speaker}</Text>
                  <Text style={styles.venueText}>{vid.venue}</Text>
                  <View style={styles.statsRow}>
                    <Ionicons name="play" size={10} color="#8D6E63" />
                    <Text style={styles.statsText}>
                      {vid.views} • {vid.date}
                    </Text>
                  </View>
                </View>

                {/* More Options */}
                <TouchableOpacity style={styles.moreOptionsBtn}>
                  <Ionicons name="ellipsis-vertical" size={16} color="#8D6E63" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  scrollContent: {
    paddingBottom: 40,
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
  videosList: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  thumbWrapper: {
    width: 110,
    height: 75,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFF3E0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  infoCol: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3E2723',
    lineHeight: 16,
  },
  speakerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D97706',
    marginTop: 2,
  },
  venueText: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statsText: {
    fontSize: 9,
    color: '#8D6E63',
    marginLeft: 3,
  },
  moreOptionsBtn: {
    padding: 4,
    justifyContent: 'flex-start',
  },
});
