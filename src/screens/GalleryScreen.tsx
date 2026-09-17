import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { COLORS, SHADOWS } from '../constants/colors';
import { MOCK_ALBUMS, OTHER_ALBUMS, SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

export const GalleryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedViewMode, setSelectedViewMode] = useState<'albums' | 'photos'>('albums');

  return (
    <View style={styles.container}>
      <Header
        title="Gallery"
        subtitle="Divine moments captured"
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
        {/* Toggle Segment: Albums vs All Photos */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              selectedViewMode === 'albums' && styles.toggleBtnActive,
            ]}
            onPress={() => setSelectedViewMode('albums')}
          >
            <Ionicons
              name="albums-outline"
              size={16}
              color={selectedViewMode === 'albums' ? '#FFFFFF' : '#8D6E63'}
            />
            <Text
              style={[
                styles.toggleBtnText,
                selectedViewMode === 'albums' && styles.toggleBtnTextActive,
              ]}
            >
              Albums
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              selectedViewMode === 'photos' && styles.toggleBtnActive,
            ]}
            onPress={() => setSelectedViewMode('photos')}
          >
            <Ionicons
              name="grid-outline"
              size={16}
              color={selectedViewMode === 'photos' ? '#FFFFFF' : '#8D6E63'}
            />
            <Text
              style={[
                styles.toggleBtnText,
                selectedViewMode === 'photos' && styles.toggleBtnTextActive,
              ]}
            >
              All Photos
            </Text>
          </TouchableOpacity>
        </View>

        {selectedViewMode === 'albums' ? (
          <>
            {/* Festival Albums Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Festival Albums</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All &gt;</Text>
              </TouchableOpacity>
            </View>

            {/* 2-Column Grid */}
            <View style={styles.gridContainer}>
              {MOCK_ALBUMS.map((album) => (
                <TouchableOpacity
                  key={album.id}
                  style={styles.albumCard}
                  onPress={() => navigation.navigate('AlbumDetails', { id: album.id })}
                  activeOpacity={0.85}
                >
                  <View style={styles.albumImageWrapper}>
                    <Image source={{ uri: album.coverImage }} style={styles.albumImage} />
                    <View style={styles.photoCountBadge}>
                      <Ionicons name="images-outline" size={10} color="#FFFFFF" />
                      <Text style={styles.photoCountText}>{album.photoCount}</Text>
                    </View>
                  </View>

                  <View style={styles.albumMeta}>
                    <View style={styles.albumTitleRow}>
                      <Text style={styles.albumTitle} numberOfLines={1}>
                        {album.title}
                      </Text>
                      <Ionicons name="ellipsis-vertical" size={14} color="#8D6E63" />
                    </View>
                    <Text style={styles.albumLocation}>{album.location}</Text>
                    <View style={styles.albumDateRow}>
                      <Ionicons name="calendar-outline" size={10} color="#8D6E63" />
                      <Text style={styles.albumDate}>{album.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Other Albums Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Other Albums</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All &gt;</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.otherAlbumsScroll}
            >
              {OTHER_ALBUMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.otherAlbumItem}
                  onPress={() => navigation.navigate('AlbumDetails', { id: 'alb_001' })}
                >
                  <Image source={{ uri: item.image }} style={styles.otherAlbumThumb} />
                  <Text style={styles.otherAlbumTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.otherAlbumCount}>{item.count}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : (
          /* All Photos Grid View */
          <View style={styles.allPhotosGrid}>
            {[
              SPIRITUAL_IMAGES.rathaYatra,
              SPIRITUAL_IMAGES.deities,
              SPIRITUAL_IMAGES.kirtanCrowd,
              SPIRITUAL_IMAGES.prabhuLecture,
              SPIRITUAL_IMAGES.mayapurTemple,
              SPIRITUAL_IMAGES.krishnaArt,
              SPIRITUAL_IMAGES.prabhuPortrait,
              SPIRITUAL_IMAGES.gitaBook,
              SPIRITUAL_IMAGES.deities,
            ].map((imgUrl, i) => (
              <TouchableOpacity
                key={i}
                style={styles.photoGridItem}
                onPress={() => navigation.navigate('AlbumDetails', { id: 'alb_001' })}
              >
                <Image source={{ uri: imgUrl }} style={styles.gridThumb} />
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
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 16,
  },
  toggleBtnActive: {
    backgroundColor: '#E65100',
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8D6E63',
    marginLeft: 6,
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
    borderLeftWidth: 3,
    borderLeftColor: '#D97706',
    paddingLeft: 8,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  albumCard: {
    width: (width - 44) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  albumImageWrapper: {
    width: '100%',
    height: 105,
    position: 'relative',
    backgroundColor: '#FFF3E0',
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  photoCountBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  photoCountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 3,
  },
  albumMeta: {
    padding: 8,
  },
  albumTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3E2723',
    flex: 1,
  },
  albumLocation: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 1,
  },
  albumDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  albumDate: {
    fontSize: 9,
    color: '#8D6E63',
    marginLeft: 3,
  },
  otherAlbumsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  otherAlbumItem: {
    alignItems: 'center',
    marginRight: 14,
    width: 85,
  },
  otherAlbumThumb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FDE68A',
    marginBottom: 6,
  },
  otherAlbumTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3E2723',
    textAlign: 'center',
  },
  otherAlbumCount: {
    fontSize: 9,
    color: '#8D6E63',
    textAlign: 'center',
    marginTop: 1,
  },
  allPhotosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginTop: 10,
  },
  photoGridItem: {
    width: (width - 44) / 3,
    height: (width - 44) / 3,
    padding: 3,
  },
  gridThumb: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
