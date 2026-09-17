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
import { QuoteCard } from '../components/QuoteCard';
import { ScreenSwitcherModal } from '../components/ScreenSwitcherModal';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [switcherVisible, setSwitcherVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Spiritual Header */}
      <Header
        isHomeHeader
        onOpenMenu={() => setSwitcherVisible(true)}
        showSearch
        onSearch={() => navigation.navigate('VideoLibrary')}
        showNotification
        onNotification={() => navigation.navigate('Notifications')}
        rightCustomAction={
          <TouchableOpacity
            style={styles.allScreensBadge}
            onPress={() => setSwitcherVisible(true)}
          >
            <Ionicons name="apps" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner: Today's Bhagavatam Class (Live) */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.prabhuLecture }}
            style={styles.heroImageBg}
          />
          <View style={styles.heroGradientOverlay} />

          <View style={styles.heroContent}>
            <Text style={styles.heroCategory}>Today's</Text>
            <Text style={styles.heroTitle}>Bhagavatam Class</Text>

            <View style={styles.heroMetaRow}>
              <Ionicons name="time-outline" size={14} color="#FFE0B2" />
              <Text style={styles.heroMetaText}>7:30 AM - 8:30 AM</Text>
            </View>

            <View style={styles.heroMetaRow}>
              <Ionicons name="location-outline" size={14} color="#FFE0B2" />
              <Text style={styles.heroMetaText}>Mayapur Dham</Text>
            </View>

            <TouchableOpacity
              style={styles.watchLiveBtn}
              onPress={() => navigation.navigate('ProgramDetails', { id: 'prog_001' })}
              activeOpacity={0.88}
            >
              <Ionicons name="play" size={16} color="#FFFFFF" />
              <Text style={styles.watchLiveText}>Watch Live</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6 Quick Category Circles */}
        <View style={styles.categoryGrid}>
          <TouchableOpacity
            style={styles.categoryCol}
            onPress={() => navigation.navigate('ProgramDetails', { id: 'prog_001' })}
          >
            <View style={[styles.categoryCircle, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="videocam" size={22} color="#DC2626" />
            </View>
            <Text style={styles.categoryLabel}>Watch Live</Text>
            <Text style={styles.categorySub}>Join Live Classes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCol}
            onPress={() => navigation.navigate('TodayPrograms')}
          >
            <View style={[styles.categoryCircle, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="calendar" size={22} color="#D97706" />
            </View>
            <Text style={styles.categoryLabel}>Programs</Text>
            <Text style={styles.categorySub}>View Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCol}
            onPress={() => navigation.navigate('AboutPrabhu')}
          >
            <View style={[styles.categoryCircle, { backgroundColor: '#EDE9FE' }]}>
              <Ionicons name="book" size={22} color="#7C3AED" />
            </View>
            <Text style={styles.categoryLabel}>Books</Text>
            <Text style={styles.categorySub}>Read & Download</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCol}
            onPress={() => navigation.navigate('AudioLibrary')}
          >
            <View style={[styles.categoryCircle, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="headset" size={22} color="#0284C7" />
            </View>
            <Text style={styles.categoryLabel}>Audio</Text>
            <Text style={styles.categorySub}>Listen Anytime</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCol}
            onPress={() => navigation.navigate('VideoLibrary')}
          >
            <View style={[styles.categoryCircle, { backgroundColor: '#FFEDD5' }]}>
              <Ionicons name="play-circle" size={22} color="#EA580C" />
            </View>
            <Text style={styles.categoryLabel}>Videos</Text>
            <Text style={styles.categorySub}>Watch Lectures</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCol}
            onPress={() => navigation.navigate('Gallery')}
          >
            <View style={[styles.categoryCircle, { backgroundColor: '#FCE7F3' }]}>
              <Ionicons name="images" size={22} color="#DB2777" />
            </View>
            <Text style={styles.categoryLabel}>Gallery</Text>
            <Text style={styles.categorySub}>Photos & Albums</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Schedule Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TodayPrograms')}>
            <Text style={styles.viewAllText}>View All &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Schedule Timeline Cards */}
        <View style={styles.scheduleCardsRow}>
          {/* Morning (LIVE) */}
          <TouchableOpacity
            style={styles.scheduleCard}
            onPress={() => navigation.navigate('ProgramDetails', { id: 'prog_001' })}
          >
            <View style={styles.scheduleCardHeader}>
              <Ionicons name="sunny-outline" size={16} color="#D97706" />
              <Text style={styles.scheduleTimePeriod}>Morning</Text>
              <View style={styles.livePill}>
                <Text style={styles.livePillText}>LIVE</Text>
              </View>
            </View>
            <Text style={styles.scheduleHours}>7:30 AM - 8:30 AM</Text>
            <Text style={styles.scheduleEventName} numberOfLines={1}>
              Bhagavatam Class
            </Text>
            <View style={styles.scheduleVenueRow}>
              <Ionicons name="location-outline" size={12} color="#8D6E63" />
              <Text style={styles.scheduleVenueText} numberOfLines={1}>
                Mayapur Dham
              </Text>
            </View>
          </TouchableOpacity>

          {/* Afternoon */}
          <TouchableOpacity
            style={styles.scheduleCard}
            onPress={() => navigation.navigate('ProgramDetails', { id: 'prog_002' })}
          >
            <View style={styles.scheduleCardHeader}>
              <Ionicons name="home-outline" size={16} color="#D97706" />
              <Text style={styles.scheduleTimePeriod}>Afternoon</Text>
            </View>
            <Text style={styles.scheduleHours}>3:00 PM - 5:00 PM</Text>
            <Text style={styles.scheduleEventName} numberOfLines={1}>
              House Program
            </Text>
            <View style={styles.scheduleVenueRow}>
              <Ionicons name="location-outline" size={12} color="#8D6E63" />
              <Text style={styles.scheduleVenueText} numberOfLines={1}>
                Nabadwip, West Bengal
              </Text>
            </View>
          </TouchableOpacity>

          {/* Evening */}
          <TouchableOpacity
            style={styles.scheduleCard}
            onPress={() => navigation.navigate('ProgramDetails', { id: 'prog_003' })}
          >
            <View style={styles.scheduleCardHeader}>
              <Ionicons name="moon-outline" size={16} color="#7C3AED" />
              <Text style={styles.scheduleTimePeriod}>Evening</Text>
            </View>
            <Text style={styles.scheduleHours}>7:00 PM - 9:00 PM</Text>
            <Text style={styles.scheduleEventName} numberOfLines={1}>
              Kirtan & Lecture
            </Text>
            <View style={styles.scheduleVenueRow}>
              <Ionicons name="location-outline" size={12} color="#8D6E63" />
              <Text style={styles.scheduleVenueText} numberOfLines={1}>
                Mayapur Dham
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Spiritual Quote Card */}
        <QuoteCard
          quote="Chant Hare Krishna and be happy. This is the easiest way to success in life."
          author="Padmanetra Prabhu"
        />

        {/* Content Highlights Row: Latest Video, Poem, Book, Festival */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {/* Latest Video Card */}
          <TouchableOpacity
            style={styles.highlightCard}
            onPress={() => navigation.navigate('VideoDetails', { id: 'vid_001' })}
          >
            <View style={styles.highlightHeader}>
              <Text style={styles.highlightCategory}>Latest Video</Text>
              <Text style={styles.highlightViewAll}>View All</Text>
            </View>
            <View style={styles.highlightImageWrapper}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.prabhuLecture }}
                style={styles.highlightThumb}
              />
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>45:12</Text>
              </View>
            </View>
            <Text style={styles.highlightTitle} numberOfLines={1}>
              SB 1.2.6 Purport
            </Text>
            <Text style={styles.highlightSub}>3 May 2024</Text>
          </TouchableOpacity>

          {/* Latest Poem Card */}
          <TouchableOpacity
            style={styles.highlightCard}
            onPress={() => navigation.navigate('PoemDetails')}
          >
            <View style={styles.highlightHeader}>
              <Text style={styles.highlightCategory}>Latest Poem</Text>
              <Text style={styles.highlightViewAll}>View All</Text>
            </View>
            <View style={[styles.highlightImageWrapper, { backgroundColor: '#FEF3C7' }]}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.krishnaArt }}
                style={styles.highlightThumb}
              />
            </View>
            <Text style={styles.highlightTitle} numberOfLines={1}>
              কৃষ্ণ নামের মধুর বাণী
            </Text>
            <Text style={styles.highlightSub}>2 May 2024</Text>
          </TouchableOpacity>

          {/* Latest Book Card */}
          <TouchableOpacity
            style={styles.highlightCard}
            onPress={() => navigation.navigate('AboutPrabhu')}
          >
            <View style={styles.highlightHeader}>
              <Text style={styles.highlightCategory}>Latest Book</Text>
              <Text style={styles.highlightViewAll}>View All</Text>
            </View>
            <View style={[styles.highlightImageWrapper, { backgroundColor: '#E0E7FF' }]}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.gitaBook }}
                style={styles.highlightThumb}
              />
            </View>
            <Text style={styles.highlightTitle} numberOfLines={1}>
              The Way of Bhakti
            </Text>
            <Text style={styles.highlightSub}>New Release</Text>
          </TouchableOpacity>

          {/* Upcoming Festival Card */}
          <TouchableOpacity
            style={styles.highlightCard}
            onPress={() => navigation.navigate('AlbumDetails', { id: 'alb_001' })}
          >
            <View style={styles.highlightHeader}>
              <Text style={styles.highlightCategory}>Upcoming Festival</Text>
              <Text style={styles.highlightViewAll}>View All</Text>
            </View>
            <View style={[styles.highlightImageWrapper, { backgroundColor: '#FCE7F3' }]}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.deities }}
                style={styles.highlightThumb}
              />
            </View>
            <Text style={styles.highlightTitle} numberOfLines={1}>
              JHULAN YATRA
            </Text>
            <Text style={styles.highlightSub}>Sri Mayapur Dham</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Upcoming Festival Banner Card */}
        <View style={styles.festivalBannerCard}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.deities }}
            style={styles.festivalThumb}
          />
          <View style={styles.festivalInfo}>
            <Text style={styles.festivalCategory}>Upcoming Festival</Text>
            <Text style={styles.festivalTitle}>Jhulan Yatra</Text>
            <View style={styles.festivalDateRow}>
              <Ionicons name="calendar-outline" size={12} color="#8D6E63" />
              <Text style={styles.festivalDate}>15 August 2024</Text>
              <Ionicons name="location-outline" size={12} color="#8D6E63" style={{ marginLeft: 6 }} />
              <Text style={styles.festivalDate} numberOfLines={1}>Sri Mayapur Dham</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.festivalViewBtn}
            onPress={() => navigation.navigate('TodayPrograms')}
          >
            <Text style={styles.festivalViewText}>View Details &gt;</Text>
            <Text style={styles.secureSmallText}>🔒 100% Secure Donation</Text>
          </TouchableOpacity>
        </View>

        {/* Donation Seva Banner */}
        <View style={styles.donationCard}>
          <View style={styles.donationHands}>
            <Ionicons name="heart" size={26} color="#DC2626" />
          </View>
          <View style={styles.donationContent}>
            <Text style={styles.donationTitle}>
              Support the Mission of Krishna Consciousness
            </Text>
            <Text style={styles.donationDesc}>
              Your contribution helps in preaching, book distribution, festivals, and seva activities.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.donateBtn}
            onPress={() => navigation.navigate('Donation')}
          >
            <Ionicons name="heart-outline" size={14} color="#FFFFFF" />
            <Text style={styles.donateBtnText}>Donate Now</Text>
            <Text style={styles.secureText}>🔒 100% Secure</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Screen Switcher Modal */}
      <ScreenSwitcherModal
        visible={switcherVisible}
        onClose={() => setSwitcherVisible(false)}
        onSelectScreen={(name) => navigation.navigate(name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  allScreensBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    padding: 6,
    borderRadius: 8,
    marginLeft: 6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 190,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.medium,
  },
  heroImageBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(62, 39, 35, 0.65)',
  },
  heroContent: {
    padding: 16,
    justifyContent: 'center',
    height: '100%',
  },
  heroCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFE0B2',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    marginTop: 2,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  heroMetaText: {
    fontSize: 12,
    color: '#FFE0B2',
    marginLeft: 6,
    fontWeight: '500',
  },
  watchLiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E65100',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 12,
  },
  watchLiveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  categoryCol: {
    width: (width - 64) / 3,
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3E2723',
    textAlign: 'center',
  },
  categorySub: {
    fontSize: 9,
    color: '#8D6E63',
    textAlign: 'center',
    marginTop: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  scheduleCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  scheduleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  scheduleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  scheduleTimePeriod: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5D4037',
    marginLeft: 4,
    flex: 1,
  },
  livePill: {
    backgroundColor: '#DC2626',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  livePillText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  scheduleHours: {
    fontSize: 10,
    color: '#8D6E63',
    fontWeight: '600',
    marginTop: 2,
  },
  scheduleEventName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3E2723',
    marginTop: 3,
  },
  scheduleVenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  scheduleVenueText: {
    fontSize: 9,
    color: '#8D6E63',
    marginLeft: 3,
    flex: 1,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  highlightCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  highlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  highlightCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3E2723',
  },
  highlightViewAll: {
    fontSize: 9,
    color: '#D97706',
    fontWeight: '600',
  },
  highlightImageWrapper: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFF3E0',
  },
  highlightThumb: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  highlightTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3E2723',
    marginTop: 6,
  },
  highlightSub: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 2,
  },
  festivalBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    ...SHADOWS.soft,
  },
  festivalThumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  festivalInfo: {
    flex: 1,
    marginLeft: 10,
  },
  festivalCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  festivalTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
  },
  festivalDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  festivalDate: {
    fontSize: 9,
    color: '#8D6E63',
    marginLeft: 2,
  },
  festivalViewBtn: {
    alignItems: 'flex-end',
  },
  festivalViewText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  secureSmallText: {
    fontSize: 8,
    color: '#059669',
    marginTop: 4,
  },
  donationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FFCC80',
    ...SHADOWS.soft,
  },
  donationHands: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  donationContent: {
    flex: 1,
  },
  donationTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#BF360C',
  },
  donationDesc: {
    fontSize: 10,
    color: '#6B4E3D',
    marginTop: 2,
    lineHeight: 14,
  },
  donateBtn: {
    backgroundColor: '#E65100',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  donateBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  secureText: {
    color: '#FFE0B2',
    fontSize: 7,
    marginTop: 2,
  },
});
