import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuoteCard } from '../components/QuoteCard';
import { COLORS, SHADOWS } from '../constants/colors';
import { MOCK_PROGRAMS, SPIRITUAL_IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const ProgramsCalendarScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedDay, setSelectedDay] = useState<number>(24);

  // Calendar dates matrix for July 2026 (July 1st is Wednesday)
  // Weeks:
  // Row 1: [28, 29, 30, 1, 2, 3, 4]
  // Row 2: [5, 6, 7, 8, 9, 10, 11]
  // Row 3: [12, 13, 14, 15, 16, 17, 18]
  // Row 4: [19, 20, 21, 22, 23, 24, 25]
  // Row 5: [26, 27, 28, 29, 30, 31, 1]

  const calendarRows = [
    [
      { d: 28, isCurrentMonth: false },
      { d: 29, isCurrentMonth: false },
      { d: 30, isCurrentMonth: false },
      { d: 1, isCurrentMonth: true },
      { d: 2, isCurrentMonth: true },
      { d: 3, isCurrentMonth: true },
      { d: 4, isCurrentMonth: true },
    ],
    [
      { d: 5, isCurrentMonth: true },
      { d: 6, isCurrentMonth: true },
      { d: 7, isCurrentMonth: true },
      { d: 8, isCurrentMonth: true },
      { d: 9, isCurrentMonth: true },
      { d: 10, isCurrentMonth: true },
      { d: 11, isCurrentMonth: true },
    ],
    [
      { d: 12, isCurrentMonth: true },
      { d: 13, isCurrentMonth: true },
      { d: 14, isCurrentMonth: true },
      { d: 15, isCurrentMonth: true, hasEvent: true },
      { d: 16, isCurrentMonth: true },
      { d: 17, isCurrentMonth: true },
      { d: 18, isCurrentMonth: true },
    ],
    [
      { d: 19, isCurrentMonth: true },
      { d: 20, isCurrentMonth: true },
      { d: 21, isCurrentMonth: true, hasEvent: true },
      { d: 22, isCurrentMonth: true, hasEvent: true },
      { d: 23, isCurrentMonth: true },
      { d: 24, isCurrentMonth: true, hasEvent: true },
      { d: 25, isCurrentMonth: true },
    ],
    [
      { d: 26, isCurrentMonth: true },
      { d: 27, isCurrentMonth: true },
      { d: 28, isCurrentMonth: true },
      { d: 29, isCurrentMonth: true },
      { d: 30, isCurrentMonth: true },
      { d: 31, isCurrentMonth: true },
      { d: 1, isCurrentMonth: false },
    ],
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Programs Calendar"
        subtitle="Padmanetra Prabhu Official"
        showBack
        showSearch
        onSearch={() => navigation.navigate('AllPrograms')}
        showFilter
        onFilter={() => navigation.navigate('AllPrograms')}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Month Selector Bar */}
        <View style={styles.calendarCard}>
          <View style={styles.monthHeaderRow}>
            <TouchableOpacity style={styles.navArrow}>
              <Ionicons name="chevron-back" size={18} color="#78350F" />
            </TouchableOpacity>

            <Text style={styles.monthTitle}>July 2026</Text>

            <TouchableOpacity style={styles.navArrow}>
              <Ionicons name="chevron-forward" size={18} color="#78350F" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.todayButton}
              onPress={() => setSelectedDay(24)}
            >
              <Ionicons name="calendar-outline" size={14} color="#D97706" />
              <Text style={styles.todayText}>Today</Text>
            </TouchableOpacity>
          </View>

          {/* Days of week */}
          <View style={styles.weekDaysRow}>
            {DAYS_OF_WEEK.map((day) => (
              <Text key={day} style={styles.weekDayHeader}>
                {day}
              </Text>
            ))}
          </View>

          {/* Date Grid */}
          <View style={styles.datesGrid}>
            {calendarRows.map((row, rIdx) => (
              <View key={rIdx} style={styles.dateRow}>
                {row.map((cell, cIdx) => {
                  const isSelected = cell.isCurrentMonth && cell.d === selectedDay;
                  return (
                    <TouchableOpacity
                      key={cIdx}
                      style={[styles.dateCell, isSelected && styles.dateCellSelected]}
                      onPress={() => {
                        if (cell.isCurrentMonth) setSelectedDay(cell.d);
                      }}
                      disabled={!cell.isCurrentMonth}
                    >
                      <Text
                        style={[
                          styles.dateNumber,
                          !cell.isCurrentMonth && styles.dateNumberDim,
                          isSelected && styles.dateNumberSelected,
                        ]}
                      >
                        {cell.d}
                      </Text>
                      {cell.hasEvent && !isSelected && (
                        <View style={styles.eventDot} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Selected Date Header */}
        <View style={styles.selectedDateBanner}>
          <Ionicons name="calendar" size={16} color="#D97706" />
          <Text style={styles.selectedDateText}>
            Thursday, {selectedDay} July 2026
          </Text>
        </View>

        {/* Programs Timeline List for Selected Date */}
        <View style={styles.timelineList}>
          {MOCK_PROGRAMS.slice(0, 4).map((prog) => (
            <TouchableOpacity
              key={prog.id}
              style={styles.timelineCard}
              onPress={() => navigation.navigate('ProgramDetails', { id: prog.id })}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: prog.imageUrl || SPIRITUAL_IMAGES.prabhuPortrait }}
                style={styles.progThumbnail}
              />
              <View style={styles.timeBadgeCol}>
                <Text style={styles.timeTextBold}>
                  {prog.time.split('-')[0].trim()}
                </Text>
              </View>

              <View style={styles.progInfo}>
                <View style={styles.progTitleRow}>
                  <Text style={styles.progTitle} numberOfLines={1}>
                    {prog.title}
                  </Text>
                  {prog.status === 'LIVE' ? (
                    <View style={styles.liveTag}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveTagText}>LIVE</Text>
                    </View>
                  ) : (
                    <Text
                      style={[
                        styles.statusTagText,
                        prog.status === 'COMPLETED' && { color: '#9CA3AF' },
                      ]}
                    >
                      {prog.status}
                    </Text>
                  )}
                </View>

                <View style={styles.metaLine}>
                  <Ionicons name="location-outline" size={12} color="#8D6E63" />
                  <Text style={styles.metaLineText} numberOfLines={1}>
                    {prog.venue}
                  </Text>
                </View>

                <View style={styles.metaLine}>
                  <Ionicons name="person-outline" size={12} color="#8D6E63" />
                  <Text style={styles.metaLineText}>{prog.speaker}</Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={16} color="#D97706" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quote Card */}
        <QuoteCard
          quote="The more we hear, chant and remember Krishna, the more our life becomes perfect."
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
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  navArrow: {
    padding: 6,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
    marginHorizontal: 10,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginLeft: 'auto',
  },
  todayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
    paddingBottom: 6,
  },
  weekDayHeader: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8D6E63',
    width: (width - 64) / 7,
    textAlign: 'center',
  },
  datesGrid: {},
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  dateCell: {
    width: (width - 64) / 7,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    position: 'relative',
  },
  dateCellSelected: {
    backgroundColor: '#D97706',
  },
  dateNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3E2723',
  },
  dateNumberDim: {
    color: '#D7CCC8',
  },
  dateNumberSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D97706',
  },
  selectedDateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 8,
  },
  selectedDateText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2723',
    marginLeft: 8,
  },
  timelineList: {
    paddingHorizontal: 16,
  },
  timelineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3E5D8',
    ...SHADOWS.soft,
  },
  progThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  timeBadgeCol: {
    marginLeft: 10,
    width: 50,
  },
  timeTextBold: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  progInfo: {
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
  },
  progTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  progTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3E2723',
    flex: 1,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
    marginLeft: 4,
  },
  liveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DC2626',
    marginRight: 3,
  },
  liveTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#DC2626',
  },
  statusTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#D97706',
    marginLeft: 4,
  },
  metaLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  metaLineText: {
    fontSize: 9,
    color: '#8D6E63',
    marginLeft: 4,
  },
});
