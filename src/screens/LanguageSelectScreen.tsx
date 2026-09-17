import React, { useState } from 'react';
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
import { COLORS } from '../constants/colors';
import { LotusOrnament } from '../components/LotusOrnament';
import { SPIRITUAL_IMAGES } from '../data/mockData';
import { useAppStore, SUPPORTED_LANGUAGES, LanguageCode } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export const LanguageSelectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const currentLanguage = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLanguage);

  const handleContinue = () => {
    setLanguage(selectedLang);
    navigation.navigate('WelcomeAuth');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Top Header Logo */}
      <View style={styles.topHeader}>
        <Ionicons name="flower-outline" size={26} color="#D97706" />
        <Text style={styles.headerPrabhuName}>PADMANETRA PRABHU</Text>
        <Text style={styles.headerOfficialApp}>OFFICIAL APP</Text>
      </View>

      {/* Hero Banner with Prabhu & Temple */}
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
        <Text style={styles.headingTitle}>Choose Your</Text>
        <Text style={styles.headingSubtitle}>Language</Text>
        <LotusOrnament size={16} color="#D97706" />
        <Text style={styles.instructionText}>
          Select your preferred language{'\n'}to continue
        </Text>

        {/* Language Options List */}
        <View style={styles.languageList}>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageCard,
                  isSelected && styles.languageCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedLang(lang.code)}
              >
                <View style={styles.leftRow}>
                  <View style={styles.charAvatar}>
                    <Text style={styles.charText}>{lang.charSymbol}</Text>
                  </View>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.nativeName}>{lang.nativeName}</Text>
                    <Text style={styles.englishName}>{lang.englishName}</Text>
                  </View>
                </View>

                {/* Radio Circle */}
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
  },
  headingSubtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3E2723',
    fontFamily: 'serif',
    marginTop: -4,
  },
  instructionText: {
    fontSize: 13,
    color: '#78350F',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 18,
  },
  languageList: {
    width: '100%',
    marginVertical: 14,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#F3E5D8',
    elevation: 2,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  languageCardSelected: {
    borderColor: '#D97706',
    backgroundColor: '#FFFDF9',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  charAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  charText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#B45309',
  },
  labelWrapper: {},
  nativeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E2723',
  },
  englishName: {
    fontSize: 12,
    color: '#8D6E63',
    marginTop: 1,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D7CCC8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D97706',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
});
