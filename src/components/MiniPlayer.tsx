import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../store/usePlayerStore';
import { COLORS, SHADOWS } from '../constants/colors';

export const MiniPlayer: React.FC = () => {
  const navigation = useNavigation<any>();
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const nextTrack = usePlayerStore((state) => state.nextTrack);

  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerTouchable}
        activeOpacity={0.88}
        onPress={() => navigation.navigate('PoemDetails')}
      >
        <Image
          source={{ uri: currentTrack.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.speaker} numberOfLines={1}>
            {currentTrack.speaker}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.playButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={34}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={nextTrack}
          style={styles.iconButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="play-skip-forward-outline" size={20} color="#5D4037" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AudioLibrary')}
          style={styles.iconButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="list-outline" size={20} color="#5D4037" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3E5D8',
    borderBottomWidth: 1,
    borderBottomColor: '#F3E5D8',
    ...SHADOWS.medium,
  },
  innerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  thumbnail: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#FFE0B2',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  speaker: {
    fontSize: 11,
    color: COLORS.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    paddingHorizontal: 4,
  },
  iconButton: {
    padding: 6,
    marginLeft: 4,
  },
});
