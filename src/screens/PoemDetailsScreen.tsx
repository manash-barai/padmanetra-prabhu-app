import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { LotusOrnament } from '../components/LotusOrnament';
import { COLORS, SHADOWS } from '../constants/colors';
import { MOCK_POEM, SPIRITUAL_IMAGES } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export const PoemDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  const isBookmarked = useAppStore((state) => state.isBookmarked(MOCK_POEM.id));
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${MOCK_POEM.title}" by ${MOCK_POEM.author}\n\n${MOCK_POEM.verses.join('\n\n')}\n\nRead more on Padmanetra Prabhu Official App.`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const cycleFontSize = () => {
    setFontSizeOffset((prev) => (prev >= 4 ? 0 : prev + 2));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Poem Details"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showShare
        onShare={handleShare}
        rightCustomAction={
          <TouchableOpacity
            onPress={() => toggleBookmark(MOCK_POEM.id)}
            style={styles.headerIconBtn}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={isBookmarked ? '#FEF3C7' : '#FFFFFF'}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sacred Artwork of Sri Krishna */}
        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.krishnaArt }}
            style={styles.artworkImage}
            resizeMode="cover"
          />
          <View style={styles.artworkGlow} />
        </View>

        {/* Poem Container Card */}
        <View style={styles.poemCard}>
          <Text style={styles.poemTitle}>{MOCK_POEM.title}</Text>
          <LotusOrnament size={20} color="#D97706" />

          {/* Stanzas */}
          <View style={styles.versesWrapper}>
            {MOCK_POEM.verses.map((stanza, idx) => (
              <View key={idx} style={styles.stanzaBlock}>
                <Text
                  style={[
                    styles.stanzaText,
                    { fontSize: 14 + fontSizeOffset, lineHeight: 22 + fontSizeOffset * 1.3 },
                  ]}
                >
                  {stanza}
                </Text>
              </View>
            ))}
          </View>

          {/* Meta Info Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#D97706" />
              <View style={styles.metaTextWrap}>
                <Text style={styles.metaVal}>{MOCK_POEM.date}</Text>
                <Text style={styles.metaKey}>Date</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="flower-outline" size={16} color="#D97706" />
              <View style={styles.metaTextWrap}>
                <Text style={styles.metaVal}>{MOCK_POEM.category}</Text>
                <Text style={styles.metaKey}>Category</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={16} color="#D97706" />
              <View style={styles.metaTextWrap}>
                <Text style={styles.metaVal}>{MOCK_POEM.author}</Text>
                <Text style={styles.metaKey}>Author</Text>
              </View>
            </View>
          </View>

          {/* Audio Recitation Player Bar */}
          <View style={styles.audioControlsRow}>
            <TouchableOpacity style={styles.audioSkipBtn}>
              <Ionicons name="play-skip-back" size={18} color="#78350F" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.audioPlayBtn}
              onPress={() => setIsPlayingAudio(!isPlayingAudio)}
            >
              <Ionicons
                name={isPlayingAudio ? 'pause' : 'play'}
                size={26}
                color="#FFFFFF"
                style={{ marginLeft: isPlayingAudio ? 0 : 3 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.audioSkipBtn}>
              <Ionicons name="play-skip-forward" size={18} color="#78350F" />
            </TouchableOpacity>
          </View>

          {/* Bottom Tools Row */}
          <View style={styles.bottomToolsRow}>
            <TouchableOpacity style={styles.toolBtn} onPress={cycleFontSize}>
              <Text style={styles.toolIconText}>Aa</Text>
              <Text style={styles.toolLabel}>Text Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => toggleBookmark(MOCK_POEM.id)}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={18}
                color="#5D4037"
              />
              <Text style={styles.toolLabel}>
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolBtn} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={18} color="#5D4037" />
              <Text style={styles.toolLabel}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  headerIconBtn: {
    padding: 6,
    marginRight: 6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  artworkContainer: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.medium,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  artworkGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(217, 119, 6, 0.08)',
  },
  poemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  poemTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  versesWrapper: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  stanzaBlock: {
    marginBottom: 14,
    alignItems: 'center',
  },
  stanzaText: {
    fontStyle: 'italic',
    color: '#4A2810',
    textAlign: 'center',
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3E8DC',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  metaTextWrap: {
    marginLeft: 6,
  },
  metaVal: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3E2723',
  },
  metaKey: {
    fontSize: 8,
    color: '#8D6E63',
  },
  audioControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  audioSkipBtn: {
    padding: 10,
  },
  audioPlayBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E65100',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    ...SHADOWS.soft,
  },
  bottomToolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3E8DC',
  },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  toolIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#5D4037',
    marginRight: 4,
  },
  toolLabel: {
    fontSize: 11,
    color: '#5D4037',
    fontWeight: '600',
    marginLeft: 4,
  },
});
