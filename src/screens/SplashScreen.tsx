import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { LotusOrnament } from '../components/LotusOrnament';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2400);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.innerContainer}
        onPress={() => navigation.replace('Onboarding')}
      >
        {/* Top Header Logo */}
        <View style={styles.topLogoSection}>
          <Ionicons name="flower-outline" size={42} color="#D97706" />
          <Text style={styles.iskconText}>ISKCON</Text>
          <Text style={styles.mayapurText}>MAYAPUR</Text>
        </View>

        {/* Spiritual Portrait with Golden Halo */}
        <View style={styles.imageContainer}>
          <View style={styles.goldenHalo} />
          <Image
            source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
            style={styles.prabhuImage}
            resizeMode="cover"
          />
        </View>

        {/* Title & App Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>PADMANETRA</Text>
          <Text style={styles.mainTitleSecond}>PRABHU</Text>
          <Text style={styles.officialAppText}>OFFICIAL APP</Text>
          <LotusOrnament size={20} color="#D97706" />
        </View>

        {/* Loading Spinner */}
        <View style={styles.loaderSection}>
          <ActivityIndicator size="large" color="#E65100" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  topLogoSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  iskconText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8D6E63',
    letterSpacing: 3,
    marginTop: 6,
  },
  mayapurText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A1887F',
    letterSpacing: 4,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  goldenHalo: {
    position: 'absolute',
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: (width * 0.72) / 2,
    backgroundColor: '#FEF3C7',
    opacity: 0.7,
  },
  prabhuImage: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    borderWidth: 4,
    borderColor: '#FDE68A',
  },
  titleSection: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3E2723',
    letterSpacing: 2,
    fontFamily: 'serif',
  },
  mainTitleSecond: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3E2723',
    letterSpacing: 2,
    fontFamily: 'serif',
    marginTop: -2,
  },
  officialAppText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    letterSpacing: 3,
    marginTop: 8,
  },
  loaderSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 13,
    color: '#8D6E63',
    marginTop: 8,
    fontWeight: '500',
  },
});
