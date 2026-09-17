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
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { LotusOrnament } from '../components/LotusOrnament';
import { COLORS, SHADOWS } from '../constants/colors';
import { MOCK_VIDEOS, SPIRITUAL_IMAGES } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export const VideoDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const videoId = route.params?.id || 'vid_001';
  const video = MOCK_VIDEOS.find((v) => v.id === videoId) || MOCK_VIDEOS[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likesCount || 1420);
  const [hasLiked, setHasLiked] = useState(false);

  const isBookmarked = useAppStore((state) => state.isBookmarked(video.id));
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Watch "${video.title}" by Padmanetra Prabhu: https://padmanetraprabhu.com/video/${video.id}`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleDownload = () => {
    Alert.alert('Download Started', `"${video.title}" is downloading for offline viewing.`);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Video Details"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showShare
        onShare={handleShare}
        rightCustomAction={
          <TouchableOpacity
            onPress={() => toggleBookmark(video.id)}
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Video Player Mockup Container */}
        <View style={styles.playerContainer}>
          <Image source={{ uri: video.thumbnail }} style={styles.playerVideoThumb} />
          <View style={styles.playerOverlay}>
            <TouchableOpacity
              style={styles.playButtonCircle}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={34}
                color="#FFFFFF"
                style={{ marginLeft: isPlaying ? 0 : 4 }}
              />
            </TouchableOpacity>

            {/* Video Progress Bar */}
            <View style={styles.playerBottomControls}>
              <Text style={styles.playerTimeText}>12:35</Text>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
                <View style={styles.progressScrubber} />
              </View>
              <Text style={styles.playerTimeText}>{video.duration}</Text>
              <Ionicons name="scan-outline" size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </View>
          </View>
        </View>

        {/* Video Title */}
        <View style={styles.titleSection}>
          <Text style={styles.videoTitle}>{video.title}</Text>
        </View>

        {/* Speaker Row */}
        <View style={styles.speakerRow}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
            style={styles.speakerAvatar}
          />
          <View style={styles.speakerTextWrap}>
            <View style={styles.speakerNameRow}>
              <Text style={styles.speakerName}>{video.speaker}</Text>
              <Ionicons name="checkmark-circle" size={14} color="#D97706" style={{ marginLeft: 4 }} />
            </View>
            <Text style={styles.speakerVenue}>{video.venue}</Text>
          </View>

          <TouchableOpacity
            style={[styles.followBtn, isFollowing && styles.followingBtn]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
              {isFollowing ? 'Following' : '+ Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={12} color="#8D6E63" />
            <Text style={styles.statText}>{video.views}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={12} color="#8D6E63" />
            <Text style={styles.statText}>{video.date}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={12} color="#8D6E63" />
            <Text style={styles.statText}>{video.duration} min</Text>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{video.category}</Text>
          </View>
        </View>

        {/* Actions Row (Like, Share, Bookmark, Download, More) */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionItem} onPress={handleLikeToggle}>
            <Ionicons
              name={hasLiked ? 'thumbs-up' : 'thumbs-up-outline'}
              size={20}
              color={hasLiked ? '#DC2626' : '#5D4037'}
            />
            <Text style={styles.actionItemText}>
              {hasLiked ? `${likesCount}` : 'Like'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#5D4037" />
            <Text style={styles.actionItemText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => toggleBookmark(video.id)}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isBookmarked ? '#D97706' : '#5D4037'}
            />
            <Text style={styles.actionItemText}>Bookmark</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleDownload}>
            <Ionicons name="download-outline" size={20} color="#5D4037" />
            <Text style={styles.actionItemText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={20} color="#5D4037" />
            <Text style={styles.actionItemText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descCard}>
          <Text style={styles.descHeading}>Description</Text>
          <LotusOrnament size={16} color="#D97706" />
          <Text style={styles.descBody}>{video.description}</Text>
        </View>

        {/* Related Videos List */}
        <View style={styles.relatedSection}>
          <View style={styles.relatedHeader}>
            <Text style={styles.relatedTitle}>Related Videos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('VideoLibrary')}>
              <Text style={styles.relatedViewAll}>View All &gt;</Text>
            </TouchableOpacity>
          </View>

          {MOCK_VIDEOS.slice(1, 4).map((rel) => (
            <TouchableOpacity
              key={rel.id}
              style={styles.relatedCard}
              onPress={() => navigation.replace('VideoDetails', { id: rel.id })}
            >
              <View style={styles.relatedThumbWrapper}>
                <Image source={{ uri: rel.thumbnail }} style={styles.relatedThumb} />
                <View style={styles.relatedDurationBadge}>
                  <Text style={styles.relatedDurationText}>{rel.duration}</Text>
                </View>
              </View>

              <View style={styles.relatedInfo}>
                <Text style={styles.relatedItemTitle} numberOfLines={2}>
                  {rel.title}
                </Text>
                <Text style={styles.relatedSpeaker}>{rel.speaker}</Text>
                <Text style={styles.relatedMeta}>
                  {rel.views} • {rel.date}
                </Text>
              </View>

              <Ionicons name="ellipsis-vertical" size={16} color="#8D6E63" />
            </TouchableOpacity>
          ))}
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
  playerContainer: {
    width: width,
    height: 220,
    backgroundColor: '#000000',
    position: 'relative',
  },
  playerVideoThumb: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  playerOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    padding: 12,
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(230, 81, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 60,
  },
  playerBottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerTimeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 8,
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    width: '28%',
    height: '100%',
    backgroundColor: '#E65100',
    borderRadius: 2,
  },
  progressScrubber: {
    position: 'absolute',
    left: '27%',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
    lineHeight: 24,
  },
  speakerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  speakerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  speakerTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  speakerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2723',
  },
  speakerVenue: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 1,
  },
  followBtn: {
    backgroundColor: '#FFFBEB',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D97706',
  },
  followingBtn: {
    backgroundColor: '#D97706',
  },
  followBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  followingBtnText: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  statText: {
    fontSize: 10,
    color: '#8D6E63',
    marginLeft: 4,
  },
  categoryBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    marginLeft: 'auto',
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E65100',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3E8DC',
    marginTop: 14,
    marginHorizontal: 16,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionItemText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#5D4037',
    marginTop: 4,
  },
  descCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  descHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
  },
  descBody: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 18,
    marginTop: 4,
  },
  relatedSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  relatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3E2723',
  },
  relatedViewAll: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  relatedThumbWrapper: {
    width: 90,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFF3E0',
  },
  relatedThumb: {
    width: '100%',
    height: '100%',
  },
  relatedDurationBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  relatedDurationText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  relatedInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 6,
  },
  relatedItemTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3E2723',
  },
  relatedSpeaker: {
    fontSize: 10,
    color: '#D97706',
    marginTop: 2,
  },
  relatedMeta: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 2,
  },
});
