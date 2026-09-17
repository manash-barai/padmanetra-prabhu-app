import React, { useState, useEffect } from 'react';
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
import { COLORS, SHADOWS } from '../constants/colors';
import { apiGetAllPrograms } from '../services/apiService';
import { Program } from '../types';
import { SPIRITUAL_IMAGES } from '../data/mockData';

const TABS = [
  { id: 'All', label: 'All', icon: 'apps-outline' },
  { id: 'LIVE', label: 'Live', icon: 'radio-outline' },
  { id: 'UPCOMING', label: 'Upcoming', icon: 'time-outline' },
  { id: 'COMPLETED', label: 'Completed', icon: 'checkmark-circle-outline' },
];

export const AllProgramsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('All');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiGetAllPrograms(activeTab);
      setPrograms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="All Programs"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showSearch
        onSearch={() => {}}
        showFilter
        onFilter={() => navigation.navigate('ProgramsCalendar')}
      />

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={14}
                color={isActive ? '#FFFFFF' : '#8D6E63'}
              />
              <Text
                style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Month & Sort Bar */}
      <View style={styles.subBar}>
        <TouchableOpacity style={styles.monthDropdown}>
          <Ionicons name="calendar-outline" size={14} color="#D97706" />
          <Text style={styles.monthDropdownText}>July 2026</Text>
          <Ionicons name="chevron-down" size={14} color="#78350F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={14} color="#78350F" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          programs.map((prog) => (
            <View key={prog.id} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Image
                  source={{ uri: prog.imageUrl || SPIRITUAL_IMAGES.prabhuPortrait }}
                  style={styles.cardThumb}
                />

                <View style={styles.cardInfo}>
                  <View style={styles.statusRow}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            prog.status === 'LIVE'
                              ? '#DC2626'
                              : prog.status === 'UPCOMING'
                              ? '#D97706'
                              : '#9CA3AF',
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusLabel,
                        {
                          color:
                            prog.status === 'LIVE'
                              ? '#DC2626'
                              : prog.status === 'UPCOMING'
                              ? '#D97706'
                              : '#6B7280',
                        },
                      ]}
                    >
                      {prog.status}
                    </Text>
                  </View>

                  <Text style={styles.title} numberOfLines={2}>
                    {prog.title}
                  </Text>

                  <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={12} color="#8D6E63" />
                    <Text style={styles.metaText}>
                      {prog.time} {prog.timeZone || '(IST)'}
                    </Text>
                  </View>

                  <View style={styles.metaRow}>
                    <Ionicons name="location-outline" size={12} color="#8D6E63" />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {prog.venue}
                    </Text>
                  </View>

                  <View style={styles.metaRow}>
                    <Ionicons name="person-outline" size={12} color="#8D6E63" />
                    <Text style={styles.metaText}>{prog.speaker}</Text>
                  </View>
                </View>

                {/* Right Countdown / Status Tag */}
                <View style={styles.rightTagContainer}>
                  {prog.statusBadgeText && (
                    <View
                      style={[
                        styles.countdownBadge,
                        prog.status === 'LIVE' && styles.liveCountdownBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.countdownText,
                          prog.status === 'LIVE' && styles.liveCountdownText,
                        ]}
                      >
                        {prog.statusBadgeText}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.viewDetailsBtn}
                    onPress={() => navigation.navigate('ProgramDetails', { id: prog.id })}
                  >
                    <Text style={styles.viewDetailsBtnText}>View Details &gt;</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Spiritual Quote Card */}
        <QuoteCard
          quote="Programs are opportunities to hear, chant and remember Krishna together."
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF9',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
    justifyContent: 'space-between',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5EBE1',
  },
  tabButtonActive: {
    backgroundColor: '#E65100',
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B4E3D',
    marginLeft: 4,
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  subBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  monthDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  monthDropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3E2723',
    marginHorizontal: 6,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3E2723',
    marginLeft: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 6,
  },
  loader: {
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  cardHeaderRow: {
    flexDirection: 'row',
  },
  cardThumb: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '800',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#3E2723',
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 10,
    color: '#8D6E63',
    marginLeft: 4,
  },
  rightTagContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 4,
  },
  countdownBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  liveCountdownBadge: {
    backgroundColor: '#FEE2E2',
  },
  countdownText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B45309',
  },
  liveCountdownText: {
    color: '#DC2626',
    fontWeight: '800',
  },
  viewDetailsBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  viewDetailsBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
});
