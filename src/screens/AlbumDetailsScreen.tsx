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
  Modal,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { COLORS, SHADOWS } from '../constants/colors';
import { MOCK_ALBUMS, SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

export const AlbumDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const albumId = route.params?.id || 'alb_001';
  const album = MOCK_ALBUMS.find((a) => a.id === albumId) || MOCK_ALBUMS[0];

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedPhotoForPreview, setSelectedPhotoForPreview] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `View album "${album.title} - ${album.location}" on Padmanetra Prabhu Official App: https://padmanetraprabhu.com/albums/${album.id}`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadAll = () => {
    Alert.alert('Downloading Album', `Downloading all ${album.photoCount} photos in high resolution.`);
  };

  const samplePhotos = [
    SPIRITUAL_IMAGES.rathaYatra,
    SPIRITUAL_IMAGES.deities,
    SPIRITUAL_IMAGES.kirtanCrowd,
    SPIRITUAL_IMAGES.prabhuLecture,
    SPIRITUAL_IMAGES.mayapurTemple,
    SPIRITUAL_IMAGES.prabhuPortrait,
    SPIRITUAL_IMAGES.gitaBook,
    SPIRITUAL_IMAGES.krishnaArt,
    SPIRITUAL_IMAGES.rathaYatra,
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Album Details"
        subtitle={`${album.title} • ${album.location}`}
        showBack
        showShare
        onShare={handleShare}
        rightCustomAction={
          <TouchableOpacity onPress={handleDownloadAll} style={styles.headerDownloadBtn}>
            <Ionicons name="download-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Photo Carousel / Viewer */}
        <View style={styles.heroPhotoWrapper}>
          <Image
            source={{ uri: samplePhotos[activePhotoIndex] || album.coverImage }}
            style={styles.heroPhoto}
            resizeMode="cover"
          />

          {/* Photo Counter Pill & Controls */}
          <View style={styles.heroTopRow}>
            <View style={styles.counterPill}>
              <Text style={styles.counterText}>
                {activePhotoIndex + 1} / {album.photoCount}
              </Text>
            </View>

            <View style={styles.heroActionIcons}>
              <TouchableOpacity
                style={styles.heroIconBtn}
                onPress={() => setSelectedPhotoForPreview(samplePhotos[activePhotoIndex])}
              >
                <Ionicons name="search-outline" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.heroIconBtn}
                onPress={() => setSelectedPhotoForPreview(samplePhotos[activePhotoIndex])}
              >
                <Ionicons name="scan-outline" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Album Meta Information Row */}
        <View style={styles.albumMetaCard}>
          <View style={styles.metaLeft}>
            <Text style={styles.albumTitleText}>{album.title}</Text>
            <View style={styles.metaSubRow}>
              <Ionicons name="location-outline" size={12} color="#8D6E63" />
              <Text style={styles.metaSubText}>{album.location}</Text>
            </View>
            <View style={styles.metaSubRow}>
              <Ionicons name="calendar-outline" size={12} color="#8D6E63" />
              <Text style={styles.metaSubText}>{album.date}</Text>
            </View>
          </View>

          <View style={styles.metaRight}>
            <TouchableOpacity
              style={styles.albumInfoBtn}
              onPress={() => setInfoModalVisible(true)}
            >
              <Ionicons name="information-circle-outline" size={14} color="#D97706" />
              <Text style={styles.albumInfoBtnText}>Album Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadAlbumBtn} onPress={handleDownloadAll}>
              <Ionicons name="download-outline" size={14} color="#FFFFFF" />
              <Text style={styles.downloadAlbumBtnText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Photos Grid Header */}
        <View style={styles.gridHeaderRow}>
          <Text style={styles.photosCountTitle}>Photos ({album.photoCount})</Text>
          <TouchableOpacity style={styles.selectBtn}>
            <Text style={styles.selectBtnText}>Select</Text>
            <Ionicons name="grid-outline" size={14} color="#D97706" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* 3-Column Thumbnails Grid */}
        <View style={styles.photoGrid}>
          {samplePhotos.map((url, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.gridItemWrapper,
                activePhotoIndex === idx && styles.gridItemSelected,
              ]}
              onPress={() => setActivePhotoIndex(idx)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: url }} style={styles.gridPhoto} />
              <TouchableOpacity
                style={styles.gridDownloadBadge}
                onPress={() => Alert.alert('Saved', 'Photo saved to device gallery.')}
              >
                <Ionicons name="download-outline" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Album Info Modal */}
      <Modal visible={infoModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{album.title}</Text>
            <Text style={styles.modalLocation}>{album.location}</Text>
            <Text style={styles.modalDate}>Recorded on: {album.date}</Text>
            <Text style={styles.modalDesc}>
              {album.description ||
                'Joyous festival celebrations at Sri Mayapur Chandrodaya Mandir with senior vaishnavas and thousands of congregational devotees.'}
            </Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setInfoModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Photo Preview Modal */}
      <Modal visible={!!selectedPhotoForPreview} transparent animationType="fade">
        <View style={styles.fullscreenBackdrop}>
          <TouchableOpacity
            style={styles.fullscreenClose}
            onPress={() => setSelectedPhotoForPreview(null)}
          >
            <Ionicons name="close-circle" size={32} color="#FFFFFF" />
          </TouchableOpacity>
          {selectedPhotoForPreview && (
            <Image
              source={{ uri: selectedPhotoForPreview }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  headerDownloadBtn: {
    padding: 6,
    marginRight: 6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroPhotoWrapper: {
    width: width,
    height: 240,
    backgroundColor: '#000000',
    position: 'relative',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  heroTopRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterPill: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroActionIcons: {
    flexDirection: 'row',
  },
  heroIconBtn: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 14,
    padding: 6,
    marginLeft: 8,
  },
  albumMetaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  metaLeft: {
    flex: 1,
  },
  albumTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
    marginBottom: 2,
  },
  metaSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaSubText: {
    fontSize: 10,
    color: '#8D6E63',
    marginLeft: 4,
  },
  metaRight: {
    alignItems: 'flex-end',
  },
  albumInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 6,
  },
  albumInfoBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  downloadAlbumBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E65100',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  downloadAlbumBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  photosCountTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  gridItemWrapper: {
    width: (width - 44) / 3,
    height: (width - 44) / 3,
    padding: 3,
    position: 'relative',
  },
  gridItemSelected: {
    borderWidth: 2,
    borderColor: '#E65100',
    borderRadius: 10,
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  gridDownloadBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 10,
    padding: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3E2723',
  },
  modalLocation: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
    marginTop: 2,
  },
  modalDate: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 2,
  },
  modalDesc: {
    fontSize: 12,
    color: '#5D4037',
    marginTop: 10,
    lineHeight: 18,
  },
  modalCloseBtn: {
    backgroundColor: '#D97706',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  fullscreenBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  fullscreenImage: {
    width: width,
    height: width * 1.2,
  },
});
