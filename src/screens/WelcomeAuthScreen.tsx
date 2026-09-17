import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';
import { useAuthStore } from '../store/useAuthStore';

const { width } = Dimensions.get('window');

export const WelcomeAuthScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const loginAsGuest = useAuthStore((state) => state.loginAsGuest);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const handleGuest = () => {
    loginAsGuest();
    navigation.replace('HomeTabs');
  };

  const handleGoogle = async () => {
    await loginWithGoogle();
    navigation.replace('HomeTabs');
  };

  const handlePhone = () => {
    // Navigate directly into home tabs or show phone login
    loginAsGuest();
    navigation.replace('HomeTabs');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Top Header Logo */}
      <View style={styles.topHeader}>
        <Ionicons name="flower-outline" size={26} color="#D97706" />
        <Text style={styles.headerPrabhuName}>PADMANETRA PRABHU</Text>
        <Text style={styles.headerOfficialApp}>OFFICIAL APP</Text>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBannerWrapper}>
        <Image
          source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
          style={styles.heroBanner}
          resizeMode="cover"
        />
        <View style={styles.curvedOverlay} />
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <View style={styles.headingGroup}>
          <Text style={styles.welcomeTitle}>🌿 Welcome 🌿</Text>
          <Text style={styles.welcomeSubtitle}>
            Login to continue your{'\n'}spiritual journey
          </Text>
        </View>

        {/* Login Action Cards */}
        <View style={styles.cardsContainer}>
          {/* Continue as Guest */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleGuest}
            activeOpacity={0.82}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={22} color="#B45309" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Continue as Guest</Text>
              <Text style={styles.actionDesc}>Explore the app without login</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A1887F" />
          </TouchableOpacity>

          {/* Continue with Google */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleGoogle}
            activeOpacity={0.82}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="logo-google" size={20} color="#EA4335" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Continue with Google</Text>
              <Text style={styles.actionDesc}>Login using your Google account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A1887F" />
          </TouchableOpacity>

          {/* Continue with Phone Number */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handlePhone}
            activeOpacity={0.82}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
              <Ionicons name="phone-portrait-outline" size={20} color="#7C3AED" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Continue with Phone Number</Text>
              <Text style={styles.actionDesc}>Login using your mobile number</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A1887F" />
          </TouchableOpacity>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyContainer}>
          <Ionicons name="flower-outline" size={16} color="#D97706" style={{ marginBottom: 6 }} />
          <View style={styles.privacyBadge}>
            <Ionicons name="lock-closed-outline" size={16} color="#8D6E63" />
            <View style={styles.privacyTexts}>
              <Text style={styles.privacyBold}>We respect your privacy.</Text>
              <Text style={styles.privacySub}>Your data is safe with us.</Text>
            </View>
          </View>
        </View>
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
    paddingBottom: 4,
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
  heroBannerWrapper: {
    width: width,
    height: 180,
    position: 'relative',
    marginTop: 8,
  },
  heroBanner: {
    width: '100%',
    height: '100%',
  },
  curvedOverlay: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#FDF8EE',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  headingGroup: {
    alignItems: 'center',
    marginTop: 4,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#78350F',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  cardsContainer: {
    width: '100%',
    marginVertical: 10,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3E2723',
  },
  actionDesc: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 2,
  },
  privacyContainer: {
    alignItems: 'center',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  privacyTexts: {
    marginLeft: 8,
  },
  privacyBold: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5D4037',
  },
  privacySub: {
    fontSize: 10,
    color: '#8D6E63',
  },
});
