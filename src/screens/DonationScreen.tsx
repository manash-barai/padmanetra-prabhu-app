import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { COLORS, SHADOWS } from '../constants/colors';
import { DONATION_PURPOSES, SPIRITUAL_IMAGES } from '../data/mockData';
import { apiSubmitDonation } from '../services/apiService';
import { PaymentMethod } from '../types';

const { width } = Dimensions.get('window');

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'UPI', label: 'UPI', icon: 'flash-outline' },
  { id: 'Bank', label: 'Bank', icon: 'business-outline' },
  { id: 'QR', label: 'QR', icon: 'qr-code-outline' },
  { id: 'International', label: 'International', icon: 'globe-outline' },
];

const QUICK_AMOUNTS = [100, 500, 1000, 2500, 5000];

export const DonationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>('purp_1');
  const [amount, setAmount] = useState<number>(500);
  const [customAmountText, setCustomAmountText] = useState<string>('500');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmountText(val.toString());
    setIsCustom(false);
  };

  const handleCustomAmountChange = (text: string) => {
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    setCustomAmountText(text);
    setAmount(num);
    setIsCustom(true);
  };

  const handleDonate = async () => {
    if (amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount.');
      return;
    }

    try {
      setLoading(true);
      const res = await apiSubmitDonation({
        purposeId: selectedPurposeId,
        amount,
        paymentMethod: selectedMethod,
      });

      Alert.alert(
        '🙏 Donation Successful',
        `${res.message}\n\nTransaction ID: ${res.transactionId}`,
        [{ text: 'Hare Krishna', onPress: () => navigation.navigate('HomeScreen') }]
      );
    } catch (e) {
      Alert.alert('Error', 'Unable to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Donation"
        subtitle="Your contribution makes a difference"
        showBack
        showFavorite
        isFavorite
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner: Serve with Love */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: SPIRITUAL_IMAGES.krishnaArt }}
            style={styles.heroImgBg}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          <View style={styles.heroTextContent}>
            <Text style={styles.heroBannerTitle}>Serve with Love,</Text>
            <Text style={styles.heroBannerTitle}>Inspire a Lifetime</Text>
            <Text style={styles.heroBannerSubtitle}>
              Support spiritual growth{'\n'}and devotional service
            </Text>
          </View>
        </View>

        {/* Choose Payment Method */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>

          <View style={styles.paymentMethodsRow}>
            {PAYMENT_METHODS.map((m) => {
              const isSelected = selectedMethod === m.id;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.methodCard,
                    isSelected && styles.methodCardSelected,
                  ]}
                  onPress={() => setSelectedMethod(m.id)}
                >
                  <Ionicons
                    name={m.icon as any}
                    size={22}
                    color={isSelected ? '#E65100' : '#8D6E63'}
                  />
                  <Text
                    style={[
                      styles.methodLabel,
                      isSelected && styles.methodLabelSelected,
                    ]}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Subcard with UPI apps */}
          <View style={styles.paymentDetailBox}>
            <View style={styles.detailBoxLeft}>
              <Text style={styles.detailBoxTitle}>{selectedMethod}</Text>
              <Text style={styles.detailBoxSub}>
                {selectedMethod === 'UPI'
                  ? 'Pay using any UPI App (Google Pay, PhonePe, Paytm, BHIM etc.)'
                  : selectedMethod === 'Bank'
                  ? 'Direct NEFT / RTGS transfer to ISKCON Mayapur Trust'
                  : selectedMethod === 'QR'
                  ? 'Scan instant temple UPI QR code on the counter'
                  : 'International Credit / Debit Cards accepted'}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#8D6E63" />
          </View>
        </View>

        {/* Select Purpose */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Select Purpose</Text>
          <Text style={styles.sectionSub}>Choose the purpose of your donation</Text>

          <View style={styles.purposesList}>
            {DONATION_PURPOSES.map((item) => {
              const isSelected = selectedPurposeId === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.purposeCard,
                    isSelected && styles.purposeCardSelected,
                  ]}
                  onPress={() => setSelectedPurposeId(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.purposeIconWrap}>
                    <Ionicons name={item.icon as any} size={22} color="#D97706" />
                  </View>

                  <View style={styles.purposeTextWrap}>
                    <Text style={styles.purposeTitle}>{item.title}</Text>
                    <Text style={styles.purposeDesc}>{item.description}</Text>
                  </View>

                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleActive,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Enter Amount */}
        <View style={styles.sectionBlock}>
          <View style={styles.amountHeaderRow}>
            <Text style={styles.sectionTitle}>Enter Amount</Text>
            <View style={styles.amountInputDisplay}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountTextInput}
                keyboardType="numeric"
                value={customAmountText}
                onChangeText={handleCustomAmountChange}
              />
              <Ionicons name="pencil" size={14} color="#D97706" />
            </View>
          </View>

          {/* Quick Amount Chips */}
          <View style={styles.chipsRow}>
            {QUICK_AMOUNTS.map((val) => {
              const isSelected = !isCustom && amount === val;
              return (
                <TouchableOpacity
                  key={val}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => handleSelectAmount(val)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    ₹ {val.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.chip, isCustom && styles.chipSelected]}
              onPress={() => setIsCustom(true)}
            >
              <Text
                style={[
                  styles.chipText,
                  isCustom && styles.chipTextSelected,
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 100% Secure Footnote */}
        <View style={styles.securityBox}>
          <Ionicons name="shield-checkmark-outline" size={18} color="#059669" />
          <View style={styles.securityTextWrap}>
            <Text style={styles.securityTitle}>
              Your donation is secure and will be used for spiritual and charitable activities.
            </Text>
          </View>
          <View style={styles.secureTag}>
            <Ionicons name="lock-closed" size={10} color="#059669" />
            <Text style={styles.secureTagText}>100% Secure</Text>
          </View>
        </View>

        {/* Donate Now CTA Button */}
        <TouchableOpacity
          style={styles.donateCtaBtn}
          onPress={handleDonate}
          disabled={loading}
          activeOpacity={0.88}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="heart" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.donateCtaText}>
                Donate Now • ₹{amount.toLocaleString()}
              </Text>
            </>
          )}
        </TouchableOpacity>
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
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.medium,
  },
  heroImgBg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(62, 39, 35, 0.65)',
  },
  heroTextContent: {
    padding: 16,
    justifyContent: 'center',
    height: '100%',
  },
  heroBannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  heroBannerSubtitle: {
    fontSize: 11,
    color: '#FFE0B2',
    marginTop: 4,
    lineHeight: 16,
  },
  sectionBlock: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3E2723',
  },
  sectionSub: {
    fontSize: 11,
    color: '#8D6E63',
    marginTop: 2,
    marginBottom: 8,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  methodCard: {
    width: (width - 56) / 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  methodCardSelected: {
    borderColor: '#E65100',
    backgroundColor: '#FFF8F2',
  },
  methodLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8D6E63',
    marginTop: 4,
  },
  methodLabelSelected: {
    color: '#E65100',
  },
  paymentDetailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F3E5D8',
  },
  detailBoxLeft: {
    flex: 1,
  },
  detailBoxTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3E2723',
  },
  detailBoxSub: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 2,
  },
  purposesList: {
    marginTop: 6,
  },
  purposeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  purposeCardSelected: {
    borderColor: '#D97706',
    backgroundColor: '#FFFDF9',
  },
  purposeIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  purposeTextWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  purposeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2723',
  },
  purposeDesc: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 2,
    lineHeight: 14,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D7CCC8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
  amountHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountInputDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D97706',
    marginRight: 4,
  },
  amountTextInput: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
    minWidth: 50,
    padding: 0,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chip: {
    width: (width - 48) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3E5D8',
  },
  chipSelected: {
    borderColor: '#E65100',
    backgroundColor: '#FFF3E0',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5D4037',
  },
  chipTextSelected: {
    color: '#E65100',
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityTextWrap: {
    flex: 1,
    marginLeft: 8,
    marginRight: 6,
  },
  securityTitle: {
    fontSize: 10,
    color: '#166534',
    lineHeight: 14,
  },
  secureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  secureTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#15803D',
    marginLeft: 3,
  },
  donateCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E65100',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 24,
    ...SHADOWS.medium,
  },
  donateCtaText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
