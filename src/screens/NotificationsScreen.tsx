import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { COLORS, SHADOWS } from '../constants/colors';
import { NOTIFICATIONS } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

export const NotificationsScreen: React.FC = () => {
  const markAsRead = useAppStore((state) => state.markNotificationsAsRead);

  return (
    <View style={styles.container}>
      <Header
        title="Notifications"
        subtitle="Stay updated with classes & events"
        showBack
        rightCustomAction={
          <TouchableOpacity onPress={markAsRead} style={styles.markReadBtn}>
            <Text style={styles.markReadText}>Mark read</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {NOTIFICATIONS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View
              style={[
                styles.iconWrap,
                item.type === 'program' && { backgroundColor: '#FEE2E2' },
                item.type === 'video' && { backgroundColor: '#FEF3C7' },
                item.type === 'general' && { backgroundColor: '#E0F2FE' },
              ]}
            >
              <Ionicons
                name={
                  item.type === 'program'
                    ? 'radio-outline'
                    : item.type === 'video'
                    ? 'videocam-outline'
                    : 'notifications-outline'
                }
                size={20}
                color={
                  item.type === 'program'
                    ? '#DC2626'
                    : item.type === 'video'
                    ? '#D97706'
                    : '#0284C7'
                }
              />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EE',
  },
  markReadBtn: {
    padding: 6,
    marginRight: 6,
  },
  markReadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#3E2723',
  },
  body: {
    fontSize: 11,
    color: '#5D4037',
    marginTop: 2,
    lineHeight: 16,
  },
  time: {
    fontSize: 9,
    color: '#8D6E63',
    marginTop: 4,
  },
});
