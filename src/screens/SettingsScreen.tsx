import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuoteCard } from '../components/QuoteCard';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const language = useAppStore((state) => state.language);

  const getLanguageName = () => {
    switch (language) {
      case 'bn':
        return 'বাংলা';
      case 'hi':
        return 'हिंदी';
      case 'en':
      default:
        return 'English';
    }
  };

  return (
    <View style={styles.container}>
      {/* Settings Top Banner */}
      <View style={styles.topSettingsBanner}>
        <Image
          source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay} />

        <View style={styles.bannerContentRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Settings</Text>
            <Text style={styles.bannerSub}>Manage your preferences and app settings</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Settings Group */}
        <View style={styles.settingsGroup}>
          {/* Language */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('LanguageSelect')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#EDE9FE' }]}>
              <Ionicons name="globe-outline" size={20} color="#7C3AED" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingSub}>Choose your preferred language</Text>
            </View>
            <Text style={styles.langValue}>{getLanguageName()}</Text>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={styles.settingItem}>
            <View style={[styles.iconWrap, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="moon-outline" size={20} color="#0284C7" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingSub}>Reduce eye strain & save battery</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D7CCC8', true: '#FFB74D' }}
              thumbColor={isDarkMode ? '#E65100' : '#F5F5F5'}
            />
          </View>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="notifications-outline" size={20} color="#EA580C" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingSub}>Manage notification preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* Privacy */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert(
                'Privacy Policy',
                'Your devotional activity and personal details are strictly safeguarded according to ISKCON privacy standards.'
              )
            }
          >
            <View style={[styles.iconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#16A34A" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Privacy</Text>
              <Text style={styles.settingSub}>Manage your privacy settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert(
                'Terms & Conditions',
                'Padmanetra Prabhu Official App is dedicated to devotional educational purposes under ISKCON Mayapur.'
              )
            }
          >
            <View style={[styles.iconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="document-text-outline" size={20} color="#D97706" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Terms & Conditions</Text>
              <Text style={styles.settingSub}>Read our terms and conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* About App */}
          <TouchableOpacity
            style={[styles.settingItem, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('AboutPrabhu')}
          >
            <View style={[styles.iconWrap, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="information-circle-outline" size={20} color="#9333EA" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>About App</Text>
              <Text style={styles.settingSub}>App version, features and more</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>
        </View>

        {/* App Information Section Card */}
        <View style={styles.appInfoCard}>
          <View style={styles.appIconBadge}>
            <Ionicons name="flower" size={26} color="#D97706" />
            <Text style={styles.jalaText}>JALA PROCHAR</Text>
          </View>

          <View style={styles.appInfoTextCol}>
            <Text style={styles.appName}>Jala Prochar</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.appCopyright}>
              © 2025 ISKCON Mayapur.{'\n'}All rights reserved.
            </Text>
          </View>
        </View>

        {/* Spiritual Quote Card */}
        <QuoteCard
          quote="Everything is offered to Krishna, and everything becomes sacred."
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
  topSettingsBanner: {
    height: 160,
    width: width,
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bannerImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(62, 39, 35, 0.72)',
  },
  bannerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  bannerSub: {
    fontSize: 11,
    color: '#FFE0B2',
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTextWrap: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2723',
  },
  settingSub: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 2,
  },
  langValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginRight: 4,
  },
  appInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    ...SHADOWS.soft,
  },
  appIconBadge: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#3E2723',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  jalaText: {
    fontSize: 6,
    fontWeight: '800',
    color: '#FDE68A',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  appInfoTextCol: {
    marginLeft: 14,
    flex: 1,
  },
  appName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
  },
  appVersion: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 1,
  },
  appCopyright: {
    fontSize: 9,
    color: '#A1887F',
    marginTop: 4,
    lineHeight: 12,
  },
});
