import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';

interface QuoteCardProps {
  quote?: string;
  author?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote = 'Chant Hare Krishna and be happy.\nThis is the easiest way to success in life.',
  author = 'Padmanetra Prabhu',
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.lotusWatermark}>
        <Ionicons name="flower-outline" size={80} color="#FDE68A" />
      </View>
      <View style={styles.content}>
        <Text style={styles.quoteMark}>“</Text>
        <Text style={styles.quoteText}>{quote}</Text>
        <Text style={styles.quoteMarkRight}>”</Text>
        <Text style={styles.authorText}>- {author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.soft,
  },
  lotusWatermark: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    opacity: 0.35,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  quoteMark: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    lineHeight: 24,
    marginBottom: -4,
  },
  quoteMarkRight: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    lineHeight: 24,
    marginTop: -8,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  authorText: {
    fontSize: 12,
    color: COLORS.textGold,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.4,
  },
});
