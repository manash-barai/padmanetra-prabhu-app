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
import { MOCK_PROGRAMS, SPIRITUAL_IMAGES } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export const ProgramDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const programId = route.params?.id || 'prog_001';
  const program = MOCK_PROGRAMS.find((p) => p.id === programId) || MOCK_PROGRAMS[0];

  const hasReminder = useAppStore((state) => state.hasReminder(program.id));
  const toggleReminder = useAppStore((state) => state.toggleReminder);

  const [isFav, setIsFav] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hare Krishna! Join Padmanetra Prabhu for ${program.title} on ${program.date} at ${program.time}. Mayapur Dham.`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleReminderToggle = () => {
    toggleReminder(program.id);
    Alert.alert(
      hasReminder ? 'Reminder Removed' : 'Reminder Set',
      hasReminder
        ? `Reminder removed for ${program.title}`
        : `We will notify you 15 minutes before ${program.title} starts!`
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Program Details"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showCalendarAdd
        onCalendarAdd={handleReminderToggle}
        showShare
        onShare={handleShare}
        showFavorite
        isFavorite={isFav}
        onToggleFavorite={() => setIsFav(!isFav)}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image Banner */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: program.imageUrl || SPIRITUAL_IMAGES.prabhuLecture }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {program.status === 'LIVE' && (
            <View style={styles.liveBannerBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBannerText}>LIVE</Text>
            </View>
          )}
        </View>

        {/* Title & Core Meta */}
        <View style={styles.titleSection}>
          <Text style={styles.programTitle}>{program.title}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color="#D97706" />
            <Text style={styles.metaText}>
              {program.date}, {program.dayOfWeek || 'Thursday'}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#D97706" />
            <Text style={styles.metaText}>
              {program.time} {program.timeZone || '(IST)'}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color="#D97706" />
            <Text style={styles.metaText}>{program.venue}</Text>
          </View>
        </View>

        {/* 4 Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.actionCol}
            onPress={() => navigation.navigate('VideoDetails', { id: 'vid_001' })}
          >
            <View style={[styles.actionCircle, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="play" size={20} color="#DC2626" />
            </View>
            <Text style={styles.actionLabel}>Watch Live</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCol} onPress={handleReminderToggle}>
            <View
              style={[
                styles.actionCircle,
                hasReminder && { backgroundColor: '#D1FAE5' },
              ]}
            >
              <Ionicons
                name={hasReminder ? 'alarm' : 'calendar'}
                size={20}
                color={hasReminder ? '#059669' : '#D97706'}
              />
            </View>
            <Text style={styles.actionLabel}>
              {hasReminder ? 'Reminder On' : 'Add Reminder'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCol}
            onPress={() => navigation.navigate('ContactUs')}
          >
            <View style={styles.actionCircle}>
              <Ionicons name="navigate-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.actionLabel}>Navigate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCol} onPress={handleShare}>
            <View style={styles.actionCircle}>
              <Ionicons name="share-social-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.actionLabel}>Share Program</Text>
          </TouchableOpacity>
        </View>

        {/* About This Program */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>About This Program</Text>
          <LotusOrnament size={16} color="#D97706" />
          <Text style={styles.aboutText}>{program.description}</Text>

          {/* Details List */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <Ionicons name="person-outline" size={18} color="#D97706" />
              <Text style={styles.detailLabel}>Speaker</Text>
            </View>
            <TouchableOpacity
              style={styles.detailRight}
              onPress={() => navigation.navigate('AboutPrabhu')}
            >
              <Image
                source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
                style={styles.speakerAvatar}
              />
              <Text style={styles.detailValue}>{program.speaker}</Text>
              <Ionicons name="chevron-forward" size={16} color="#A1887F" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <Ionicons name="location-outline" size={18} color="#D97706" />
              <Text style={styles.detailLabel}>Venue</Text>
            </View>
            <View style={styles.detailRight}>
              <Text style={styles.venueFullValue} numberOfLines={2}>
                {program.fullVenue || program.venue}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#A1887F" />
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <Ionicons name="business-outline" size={18} color="#D97706" />
              <Text style={styles.detailLabel}>Organized By</Text>
            </View>
            <View style={styles.detailRight}>
              <Text style={styles.detailValue}>
                {program.organizedBy || 'ISKCON Mayapur'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#A1887F" />
            </View>
          </View>
        </View>

        {/* Location / Mini Map Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Location</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactUs')}
              style={styles.viewMapLink}
            >
              <Text style={styles.viewMapText}>View on Map</Text>
              <Ionicons name="map-outline" size={14} color="#D97706" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.mapCard}
            onPress={() => navigation.navigate('ContactUs')}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: SPIRITUAL_IMAGES.mayapurTemple }}
              style={styles.mapThumbnail}
            />
            <View style={styles.mapInfo}>
              <Text style={styles.mapTitle}>Bhagavatam Hall</Text>
              <Text style={styles.mapSubTitle}>Sri Mayapur Dham</Text>
              <Text style={styles.mapAddress} numberOfLines={1}>
                Nadia, West Bengal, India - 741313
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D97706" />
          </TouchableOpacity>
        </View>

        {/* Program Description & Lotus Note */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Program Description</Text>
          <LotusOrnament size={16} color="#D97706" />
          <Text style={styles.descParagraph}>
            The Srimad Bhagavatam is the natural commentary on the Vedanta Sutra. Hearing
            and chanting about the Lord's pastimes cleanses the heart and develops pure
            devotion for Shri Krishna.
          </Text>

          <View style={styles.devotionalBlessingCard}>
            <Ionicons name="flower-outline" size={24} color="#D97706" />
            <Text style={styles.blessingText}>
              Join us and be blessed with transcendental knowledge every morning.
            </Text>
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
  scrollContent: {
    paddingBottom: 40,
  },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 200,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.medium,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  liveBannerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },
  liveBannerText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B4E3D',
    fontWeight: '600',
    marginLeft: 6,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
  },
  actionCol: {
    alignItems: 'center',
    width: (width - 60) / 4,
  },
  actionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 10,
    color: '#5D4037',
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3E2723',
  },
  aboutText: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 18,
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#8D6E63',
    marginLeft: 8,
    fontWeight: '600',
  },
  detailRight: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  speakerAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 6,
  },
  detailValue: {
    fontSize: 12,
    color: '#3E2723',
    fontWeight: '700',
    marginRight: 4,
  },
  venueFullValue: {
    fontSize: 11,
    color: '#3E2723',
    fontWeight: '600',
    marginRight: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewMapLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMapText: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '700',
    marginRight: 4,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  mapThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  mapInfo: {
    flex: 1,
    marginLeft: 10,
  },
  mapTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3E2723',
  },
  mapSubTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
  mapAddress: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 2,
  },
  descParagraph: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 18,
    marginTop: 6,
  },
  devotionalBlessingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  blessingText: {
    fontSize: 11,
    color: '#78350F',
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
    lineHeight: 16,
  },
});
