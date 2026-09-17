import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { LotusOrnament } from '../components/LotusOrnament';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const { width, height } = Dimensions.get('window');

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('LanguageSelect');
    }
  };

  const handleSkip = () => {
    navigation.navigate('LanguageSelect');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Top Header Logo */}
      <View style={styles.topHeader}>
        <Ionicons name="flower-outline" size={26} color="#D97706" />
        <Text style={styles.headerPrabhuName}>PADMANETRA PRABHU</Text>
        <Text style={styles.headerOfficialApp}>OFFICIAL APP</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Daily Classes (Page 2) */}
        {currentStep === 0 && (
          <View style={styles.slideContainer}>
            <View style={styles.imageCard}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.prabhuLecture }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.title}>Daily Classes</Text>
              <Text style={styles.subtitle}>Watch Anywhere</Text>
              <LotusOrnament size={18} color="#D97706" />

              <Text style={styles.description}>
                Join Padmanetra Prabhu's inspiring daily classes and nourish your
                soul with timeless wisdom from anywhere in the world.
              </Text>

              {/* 4 Feature Icons */}
              <View style={styles.featuresRow}>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="play-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Live & Recorded{'\n'}Classes</Text>
                </View>

                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="globe-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Watch{'\n'}Anywhere</Text>
                </View>

                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="book-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Spiritual{'\n'}Wisdom</Text>
                </View>

                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="headset-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Audio{'\n'}Listen</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Step 2: Programs (Page 3) */}
        {currentStep === 1 && (
          <View style={styles.slideContainer}>
            <View style={styles.imageCard}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.mayapurTemple }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.title}>Programs</Text>
              <Text style={styles.subtitle}>Stay Connected</Text>
              <LotusOrnament size={18} color="#D97706" />

              <Text style={styles.description}>
                Explore upcoming programs, festivals and events. Stay connected
                and be part of the spiritual journey.
              </Text>

              {/* 4 Feature Icons */}
              <View style={styles.featuresRow}>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Upcoming{'\n'}Programs</Text>
                </View>

                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="sparkles-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Festivals &{'\n'}Celebrations</Text>
                </View>

                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="radio-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Live Events &{'\n'}Webinars</Text>
                </View>

                <View style={styles.featureItem}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.featureLabel}>Reminders &{'\n'}Updates</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Step 3: Everything in One Place (Page 4) */}
        {currentStep === 2 && (
          <View style={styles.slideContainer}>
            <View style={styles.imageCard}>
              <Image
                source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.title}>Everything in One Place</Text>
              <LotusOrnament size={18} color="#D97706" />

              <Text style={styles.description}>
                Books, audio, videos, and more. All the spiritual content you love, in one app.
              </Text>

              {/* 4 Grid Cards */}
              <View style={styles.gridContainer}>
                <View style={styles.gridCard}>
                  <View style={styles.cardIconBox}>
                    <Ionicons name="book" size={28} color="#B45309" />
                  </View>
                  <Text style={styles.cardTitle}>Books</Text>
                  <Text style={styles.cardDesc}>Explore inspiring spiritual books</Text>
                </View>

                <View style={styles.gridCard}>
                  <View style={styles.cardIconBox}>
                    <Ionicons name="headset" size={28} color="#B45309" />
                  </View>
                  <Text style={styles.cardTitle}>Audio</Text>
                  <Text style={styles.cardDesc}>Listen to kirtans, lectures & more</Text>
                </View>

                <View style={styles.gridCard}>
                  <View style={styles.cardIconBox}>
                    <Ionicons name="tv-outline" size={28} color="#B45309" />
                  </View>
                  <Text style={styles.cardTitle}>Video</Text>
                  <Text style={styles.cardDesc}>Watch enlightening videos anytime</Text>
                </View>

                <View style={styles.gridCard}>
                  <View style={styles.cardIconBox}>
                    <Ionicons name="images-outline" size={28} color="#B45309" />
                  </View>
                  <Text style={styles.cardTitle}>Gallery</Text>
                  <Text style={styles.cardDesc}>Relive beautiful moments in photos</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Row */}
      <View style={styles.bottomBar}>
        {currentStep < 2 ? (
          <>
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

            {/* Dot Indicators */}
            <View style={styles.dotsContainer}>
              {[0, 1, 2].map((idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    currentStep === idx ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
              <Text style={styles.nextText}>NEXT</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.getStartedContainer}>
            {/* Dot Indicators */}
            <View style={[styles.dotsContainer, { marginBottom: 14 }]}>
              {[0, 1, 2].map((idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    currentStep === idx ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity onPress={handleNext} style={styles.getStartedBtn}>
              <Text style={styles.getStartedBtnText}>Get Started</Text>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  topHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
  },
  headerPrabhuName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
    letterSpacing: 2,
    marginTop: 4,
    fontFamily: 'serif',
  },
  headerOfficialApp: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B45309',
    letterSpacing: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageCard: {
    width: width * 0.9,
    height: height * 0.36,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 16,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 2,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#6B4E3D',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
    paddingHorizontal: 8,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 22,
    paddingHorizontal: 6,
  },
  featureItem: {
    alignItems: 'center',
    width: (width - 64) / 4,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 6,
  },
  featureLabel: {
    fontSize: 10,
    color: '#5D4037',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 13,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  gridCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFDF9',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  cardIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2723',
  },
  cardDesc: {
    fontSize: 10,
    color: '#8D6E63',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#FDF8EE',
  },
  skipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8D6E63',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#E65100',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#FDE68A',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  nextText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E65100',
    marginRight: 2,
  },
  getStartedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D97706',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
  },
  getStartedBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 6,
  },
});
