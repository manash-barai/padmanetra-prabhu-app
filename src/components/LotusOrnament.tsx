import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface LotusOrnamentProps {
  size?: number;
  color?: string;
  showDivider?: boolean;
}

export const LotusOrnament: React.FC<LotusOrnamentProps> = ({
  size = 24,
  color = COLORS.accentGold,
  showDivider = true,
}) => {
  return (
    <View style={styles.container}>
      {showDivider && <View style={[styles.line, { backgroundColor: color }]} />}
      <View style={styles.iconWrapper}>
        <Ionicons name="flower-outline" size={size} color={color} />
      </View>
      {showDivider && <View style={[styles.line, { backgroundColor: color }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    height: 1,
    width: 36,
    opacity: 0.4,
  },
  iconWrapper: {
    marginHorizontal: 8,
  },
});
