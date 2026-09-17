import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Header } from '../components/Header';
import { LotusOrnament } from '../components/LotusOrnament';
import { QuoteCard } from '../components/QuoteCard';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

export const BiographyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Biography & Journey"
        subtitle="Padmanetra Prabhu"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroCard}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroText}>
            <Text style={styles.heroName}>Padmanetra Prabhu</Text>
            <Text style={styles.heroRole}>Jala Procharak & Co-Director, ISKCON Mayapur</Text>
          </View>
        </View>

        {/* Biography Section */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Divine Calling & Early Life</Text>
          <LotusOrnament size={16} color="#D97706" />
          <Text style={styles.bodyText}>
            From early youth, Padmanetra Prabhu was blessed with deep spiritual inclination and
            attraction to Harinama and the sacred pastimes of Sri Sri Radha Madhava. Surrendering
            his life to the lotus feet of Srila Prabhupada, he embraced brahmacharya and
            dedicated decades to rigorous study of Vedic literatures.
          </Text>
        </View>

        {/* Jala Prochar Mission */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Jala Prochar Seva</Text>
          <LotusOrnament size={16} color="#D97706" />
          <Text style={styles.bodyText}>
            As the spearhead of the pioneering "Jala Prochar" (Water Preaching) initiative, Prabhu
            has traveled tirelessly across sacred rivers including Ganga, Yamuna, and coastal delta
            villages. Conducting boat festivals, Harinam sankirtan, and mass distributing transcendental
            books and prasadam to remote riverbank communities.
          </Text>
        </View>

        {/* Key Milestones Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Service Milestones</Text>
          <LotusOrnament size={16} color="#D97706" />

          <View style={styles.milestoneItem}>
            <View style={styles.yearBadge}>
              <Text style={styles.yearText}>1998</Text>
            </View>
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneTitle}>Joined ISKCON Mayapur</Text>
              <Text style={styles.milestoneDesc}>Dedicated full-time service in temple worship and book distribution.</Text>
            </View>
          </View>

          <View style={styles.milestoneItem}>
            <View style={styles.yearBadge}>
              <Text style={styles.yearText}>2008</Text>
            </View>
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneTitle}>Founded Jala Prochar Dept</Text>
              <Text style={styles.milestoneDesc}>Began boat sankirtan across Nadia and Sundarban remote regions.</Text>
            </View>
          </View>

          <View style={styles.milestoneItem}>
            <View style={styles.yearBadge}>
              <Text style={styles.yearText}>2018</Text>
            </View>
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneTitle}>Co-Director Appointment</Text>
              <Text style={styles.milestoneDesc}>Entrusted leadership of preaching and development at Mayapur.</Text>
            </View>
          </View>
        </View>

        <QuoteCard
          quote="My only desire is to serve the mission of Srila Prabhupada and share Krishna's mercy with every soul."
          author="Padmanetra Prabhu"
        />
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
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.medium,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(62, 39, 35, 0.65)',
  },
  heroText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  heroRole: {
    fontSize: 12,
    color: '#FFE0B2',
    marginTop: 2,
  },
  card: {
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
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 19,
    marginTop: 6,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  yearBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  yearText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E65100',
  },
  milestoneContent: {
    flex: 1,
    marginLeft: 12,
  },
  milestoneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2723',
  },
  milestoneDesc: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 2,
    lineHeight: 15,
  },
});
