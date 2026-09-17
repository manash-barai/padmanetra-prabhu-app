import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuoteCard } from '../components/QuoteCard';
import { LotusOrnament } from '../components/LotusOrnament';
import { COLORS, SHADOWS } from '../constants/colors';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

export const ContactUsScreen: React.FC = () => {
  const handleEmail = () => {
    Linking.openURL('mailto:info@padmanetraprabhu.com').catch(() =>
      Alert.alert('Email', 'info@padmanetraprabhu.com')
    );
  };

  const handlePhone = () => {
    Linking.openURL('tel:+919434760402').catch(() =>
      Alert.alert('Phone', '+91 94347 60402')
    );
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/919434760402').catch(() =>
      Alert.alert('WhatsApp', '+91 94347 60402')
    );
  };

  const handleDirections = () => {
    const query = encodeURIComponent(
      'ISKCON Mayapur, Nadia District, West Bengal 741313, India'
    );
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`).catch(
      () => Alert.alert('Directions', 'Mayapur, Nadia, West Bengal - 741313')
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Contact Us"
        subtitle="We are here to help and serve you"
        showBack
        rightCustomAction={
          <TouchableOpacity style={styles.headerSupportBtn} onPress={handlePhone}>
            <Ionicons name="headset-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>We would love to{'\n'}hear from you!</Text>
            <Text style={styles.heroSub}>
              For any inquiries, suggestions or assistance, please reach out to us using the options below.
            </Text>
          </View>

          <Image
            source={{ uri: SPIRITUAL_IMAGES.prabhuPortrait }}
            style={styles.heroAvatar}
          />
        </View>

        {/* Get in Touch Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <LotusOrnament size={16} color="#D97706" />

          {/* Email */}
          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleEmail}
            activeOpacity={0.8}
          >
            <View style={[styles.contactIconWrap, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="mail-outline" size={20} color="#EA580C" />
            </View>
            <View style={styles.contactTextWrap}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>info@padmanetraprabhu.com</Text>
              <Text style={styles.contactTiming}>We will reply as soon as possible</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* Phone */}
          <TouchableOpacity
            style={styles.contactItem}
            onPress={handlePhone}
            activeOpacity={0.8}
          >
            <View style={[styles.contactIconWrap, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="call-outline" size={20} color="#0284C7" />
            </View>
            <View style={styles.contactTextWrap}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+91 94347 60402</Text>
              <Text style={styles.contactTiming}>Mon - Sat, 9:00 AM - 6:00 PM IST</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleWhatsApp}
            activeOpacity={0.8}
          >
            <View style={[styles.contactIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="logo-whatsapp" size={20} color="#16A34A" />
            </View>
            <View style={styles.contactTextWrap}>
              <Text style={styles.contactLabel}>WhatsApp</Text>
              <Text style={styles.contactValue}>+91 94347 60402</Text>
              <Text style={styles.contactTiming}>Message us on WhatsApp</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </TouchableOpacity>

          {/* Office */}
          <View style={styles.contactItem}>
            <View style={[styles.contactIconWrap, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="business-outline" size={20} color="#9333EA" />
            </View>
            <View style={styles.contactTextWrap}>
              <Text style={styles.contactLabel}>Office</Text>
              <Text style={styles.contactValue}>ISKCON Mayapur, Jala Prochar Office</Text>
              <Text style={styles.contactTiming}>Mon - Sat, 9:00 AM - 6:00 PM IST</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A1887F" />
          </View>
        </View>

        {/* Visit Us / Map Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Visit Us</Text>

          <View style={styles.mapCard}>
            <Image
              source={{ uri: SPIRITUAL_IMAGES.mayapurTemple }}
              style={styles.mapGraphic}
            />

            <View style={styles.mapAddressRow}>
              <Ionicons name="location" size={20} color="#DC2626" />
              <View style={styles.addressTextCol}>
                <Text style={styles.officeTitle}>ISKCON Mayapur, Jala Prochar Office</Text>
                <Text style={styles.officeAddress}>
                  Mayapur, Nadia District, West Bengal - 741313, India
                </Text>
              </View>

              <TouchableOpacity
                style={styles.getDirectionsBtn}
                onPress={handleDirections}
              >
                <Ionicons name="navigate" size={12} color="#FFFFFF" />
                <Text style={styles.getDirectionsBtnText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Devotional Quote */}
        <QuoteCard
          quote="Your satisfaction and spiritual growth are our top priorities."
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
  headerSupportBtn: {
    padding: 6,
    marginRight: 6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    ...SHADOWS.soft,
  },
  heroLeft: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3E2723',
    lineHeight: 22,
  },
  heroSub: {
    fontSize: 10,
    color: '#78350F',
    marginTop: 6,
    lineHeight: 14,
  },
  heroAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#D97706',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3E2723',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
  },
  contactIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactTextWrap: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3E2723',
  },
  contactValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
    marginTop: 1,
  },
  contactTiming: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 2,
  },
  mapCard: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  mapGraphic: {
    width: '100%',
    height: 140,
  },
  mapAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    padding: 12,
  },
  addressTextCol: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  officeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3E2723',
  },
  officeAddress: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 2,
  },
  getDirectionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E65100',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  getDirectionsBtnText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 3,
  },
});
