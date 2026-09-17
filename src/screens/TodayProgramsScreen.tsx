import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuoteCard } from '../components/QuoteCard';
import { LotusOrnament } from '../components/LotusOrnament';
import { COLORS, SHADOWS } from '../constants/colors';
import { apiGetTodayPrograms } from '../services/apiService';
import { Program } from '../types';

export const TodayProgramsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await apiGetTodayPrograms();
      setPrograms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'LIVE':
        return (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        );
      case 'UPCOMING':
        return (
          <View style={styles.upcomingBadge}>
            <Text style={styles.upcomingBadgeText}>UPCOMING</Text>
          </View>
        );
      case 'COMPLETED':
      default:
        return (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>COMPLETED</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Today's Programs"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showSearch
        onSearch={() => navigation.navigate('AllPrograms')}
        showFilter
        onFilter={() => navigation.navigate('ProgramsCalendar')}
        showNotification
        onNotification={() => navigation.navigate('Notifications')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Date Selector Header Banner */}
        <View style={styles.dateSelectorContainer}>
          <View style={styles.datePill}>
            <Ionicons name="calendar" size={14} color="#D97706" />
            <Text style={styles.datePillText}>Today • 24 July 2026</Text>
          </View>
          <LotusOrnament size={16} color="#D97706" showDivider />
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading today's schedule...</Text>
          </View>
        ) : (
          programs.map((prog) => (
            <View key={prog.id} style={styles.programCard}>
              <View style={styles.cardTopRow}>
                <Image
                  source={{ uri: prog.imageUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300' }}
                  style={styles.avatarImage}
                />
                <View style={styles.cardHeaderInfo}>
                  <View style={styles.titleRow}>
                    <Ionicons
                      name={
                        prog.status === 'LIVE'
                          ? 'sunny-outline'
                          : prog.title.includes('House')
                          ? 'home-outline'
                          : prog.title.includes('Kirtan')
                          ? 'musical-notes-outline'
                          : 'people-outline'
                      }
                      size={16}
                      color="#D97706"
                    />
                    <Text style={styles.programTitle} numberOfLines={2}>
                      {prog.title}
                    </Text>
                  </View>
                </View>
                {renderStatusBadge(prog.status)}
              </View>

              <View style={styles.detailsDivider} />

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={14} color="#8D6E63" />
                  <Text style={styles.infoLabel}>Speaker</Text>
                  <Text style={styles.infoValue}>{prog.speaker}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={14} color="#8D6E63" />
                  <Text style={styles.infoValue}>{prog.time}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={14} color="#8D6E63" />
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {prog.venue}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => navigation.navigate('ProgramDetails', { id: prog.id })}
                activeOpacity={0.8}
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
                <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Quote Card */}
        <QuoteCard
          quote="Chant Hare Krishna and be happy. This is the easiest way to success in life."
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
  scrollContent: {
    paddingBottom: 40,
  },
  dateSelectorContainer: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 6,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  datePillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#78350F',
    marginLeft: 6,
  },
  loaderContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#8D6E63',
    fontSize: 13,
  },
  programCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  programTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
    marginLeft: 6,
    flex: 1,
    lineHeight: 18,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
    marginRight: 4,
  },
  liveBadgeText: {
    color: '#DC2626',
    fontSize: 10,
    fontWeight: '800',
  },
  upcomingBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  upcomingBadgeText: {
    color: '#D97706',
    fontSize: 9,
    fontWeight: '800',
  },
  completedBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  completedBadgeText: {
    color: '#6B7280',
    fontSize: 9,
    fontWeight: '700',
  },
  detailsDivider: {
    height: 1,
    backgroundColor: '#F3E8DC',
    marginVertical: 10,
  },
  cardBody: {
    paddingHorizontal: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 11,
    color: '#8D6E63',
    marginLeft: 6,
    width: 60,
  },
  infoValue: {
    fontSize: 12,
    color: '#3E2723',
    fontWeight: '600',
    marginLeft: 6,
    flex: 1,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D97706',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
});
