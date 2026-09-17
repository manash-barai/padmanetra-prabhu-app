import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuoteCard } from '../components/QuoteCard';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

const PRABHU_MENU = [
  {
    id: 'bio',
    title: 'Biography',
    desc: "Learn about Prabhu's early life, spiritual background and divine calling.",
    icon: 'person-outline',
    route: 'Biography',
  },
  {
    id: 'journey',
    title: 'Journey',
    desc: 'Explore his spiritual journey, service highlights and key milestones.',
    icon: 'compass-outline',
    route: 'Biography',
  },
  {
    id: 'books',
    title: 'Books',
    desc: 'Discover books authored by Padmanetra Prabhu.',
    icon: 'book-outline',
    route: 'AudioLibrary',
  },
  {
    id: 'poems',
    title: 'Poems',
    desc: 'Read inspiring poems composed by Prabhu.',
    icon: 'heart-outline',
    route: 'PoemDetails',
  },
  {
    id: 'achievements',
    title: 'Achievements',
    desc: 'Recognitions and achievements in spiritual and social service.',
    icon: 'trophy-outline',
    route: 'Biography',
  },
  {
    id: 'gallery',
    title: 'Gallery',
    desc: "Moments of Prabhu's seva, lectures and divine travels.",
    icon: 'images-outline',
    route: 'Gallery',
  },
];

export const AboutPrabhuScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Learn more about Padmanetra Prabhu (Jala Procharak & Co-Director, ISKCON Mayapur) on the official app: https://padmanetraprabhu.com',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="About Prabhu"
        subtitle="Padmanetra Prabhu"
        showBack
        showShare
        onShare={handleShare}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card with Photo & Title */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
            style={styles.portraitPhoto}
            resizeMode="cover"
          />

          <View style={styles.profileTextWrap}>
            <Text style={styles.prabhuName}>Padmanetra Prabhu</Text>
            <Text style={styles.prabhuRole}>
              Jala Procharak & Co-Director,{'\n'}ISKCON Mayapur
            </Text>

            <View style={styles.cardQuoteBox}>
              <Text style={styles.cardQuoteText}>
                “Dedicated to spreading the message of Krishna Consciousness across the world.”
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuContainer}>
          {PRABHU_MENU.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.82}
            >
              <View style={styles.menuIconCircle}>
                <Ionicons name={item.icon as any} size={20} color="#D97706" />
              </View>

              <View style={styles.menuTextWrap}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#D7CCC8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Signature Quote Card */}
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  portraitPhoto: {
    width: '100%',
    height: 190,
  },
  profileTextWrap: {
    padding: 16,
    alignItems: 'flex-start',
  },
  prabhuName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
  },
  prabhuRole: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
    marginTop: 4,
    lineHeight: 16,
  },
  cardQuoteBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D97706',
    width: '100%',
  },
  cardQuoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#78350F',
    lineHeight: 16,
  },
  menuContainer: {
    paddingHorizontal: 16,
    marginTop: 14,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  menuIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextWrap: {
    flex: 1,
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
  },
  menuDesc: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 2,
    lineHeight: 14,
  },
});
