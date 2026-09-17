import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuoteCard } from '../components/QuoteCard';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const language = useAppStore((state) => state.language);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.replace('WelcomeAuth');
        },
      },
    ]);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'bn':
        return 'বাংলা (Bengali)';
      case 'hi':
        return 'हिंदी (Hindi)';
      case 'en':
      default:
        return 'English (Default)';
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Top Banner */}
      <View style={styles.topProfileBanner}>
        <Image
          source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay} />

        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Profile</Text>
          <Text style={styles.bannerSub}>Manage your account and preferences</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Devotee Info Card */}
        <TouchableOpacity
          style={styles.devoteeCard}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.88}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatarUrl || SPIRITUAL_IMAGES.devoteeProfile }}
              style={styles.avatarImg}
            />
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={10} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.devoteeDetails}>
            <Text style={styles.devoteeName}>{user?.name || 'Devotee Ananda Das'}</Text>
            <Text style={styles.devoteeEmail}>{user?.email || 'ananda.das@iskcon.dev'}</Text>
            <View style={styles.phoneRow}>
              <Ionicons name="call-outline" size={11} color="#8D6E63" />
              <Text style={styles.devoteePhone}>
                {user?.phone || '+91 98765 43210'}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#D7CCC8" />
        </TouchableOpacity>

        {/* Preferences Section */}
        <View style={styles.menuGroup}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('LanguageSelect')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#EDE9FE' }]}>
              <Ionicons name="language-outline" size={18} color="#7C3AED" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Language</Text>
              <Text style={styles.menuSub}>{getLanguageLabel()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('VideoLibrary')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="bookmark-outline" size={18} color="#EA580C" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Bookmarks</Text>
              <Text style={styles.menuSub}>View all your bookmarked content</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('AudioLibrary')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="time-outline" size={18} color="#0284C7" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>History</Text>
              <Text style={styles.menuSub}>View your recently watched & read items</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('AudioLibrary')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="download-outline" size={18} color="#16A34A" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Downloads</Text>
              <Text style={styles.menuSub}>View your downloaded content</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>
        </View>

        {/* Section: Account */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionHeaderLabel}>Account</Text>
        </View>
        <View style={styles.menuGroup}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="settings-outline" size={18} color="#D97706" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Account Settings</Text>
              <Text style={styles.menuSub}>Manage your personal information</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>
        </View>

        {/* Section: Support */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionHeaderLabel}>Support</Text>
        </View>
        <View style={styles.menuGroup}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('ContactUs')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#FCE7F3' }]}>
              <Ionicons name="headset-outline" size={18} color="#DB2777" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSub}>Get help and view FAQs</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>
        </View>

        {/* Section: Others */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionHeaderLabel}>Others</Text>
        </View>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
            <View style={[styles.iconWrap, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="log-out-outline" size={18} color="#DC2626" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={[styles.menuTitle, { color: '#DC2626' }]}>Logout</Text>
              <Text style={styles.menuSub}>Sign out from your account</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#DC2626" />
          </TouchableOpacity>
        </View>

        {/* Spiritual Quote Card */}
        <QuoteCard
          quote="Service to Krishna is the highest perfection of life. Let us remember Him always."
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
  topProfileBanner: {
    height: 160,
    width: width,
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  bannerImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(62, 39, 35, 0.7)',
  },
  bannerText: {
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  bannerSub: {
    fontSize: 12,
    color: '#FFE0B2',
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  devoteeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    ...SHADOWS.soft,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#D97706',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D97706',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  devoteeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  devoteeName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3E2723',
  },
  devoteeEmail: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 2,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  devoteePhone: {
    fontSize: 11,
    color: '#8D6E63',
    marginLeft: 4,
  },
  sectionHeaderWrap: {
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 4,
  },
  sectionHeaderLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8D6E63',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2723',
  },
  menuSub: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 1,
  },
});
