import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface ScreenSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectScreen: (screenName: string) => void;
}

export const SCREEN_LIST = [
  { id: '1', name: 'Splash', label: 'Page 1: Splash / Loading Screen', icon: 'flower' },
  { id: '2', name: 'Onboarding', label: 'Page 2-4: Onboarding (3 Steps)', icon: 'images' },
  { id: '5', name: 'LanguageSelect', label: 'Page 5: Choose Your Language', icon: 'language' },
  { id: '6', name: 'WelcomeAuth', label: 'Page 6: Welcome & Login', icon: 'log-in' },
  { id: '7', name: 'HomeTabs', label: 'Page 7: Home Dashboard', icon: 'home' },
  { id: '8', name: 'TodayPrograms', label: 'Page 8: Today\'s Programs', icon: 'list' },
  { id: '9', name: 'ProgramDetails', label: 'Page 9: Program Details', icon: 'document-text' },
  { id: '10', name: 'ProgramsCalendar', label: 'Page 10: Programs Calendar', icon: 'calendar' },
  { id: '11', name: 'AllPrograms', label: 'Page 11: All Programs (Filters)', icon: 'filter' },
  { id: '12', name: 'VideoLibrary', label: 'Page 12: Video Library', icon: 'videocam' },
  { id: '13', name: 'VideoDetails', label: 'Page 13: Video Details / Player', icon: 'play' },
  { id: '14', name: 'AudioLibrary', label: 'Page 14: Audio Library & MiniPlayer', icon: 'musical-notes' },
  { id: '15', name: 'PoemDetails', label: 'Page 15: Poem Details (My Krishna)', icon: 'heart' },
  { id: '16', name: 'Gallery', label: 'Page 16: Gallery (Albums / Photos)', icon: 'grid' },
  { id: '17', name: 'AlbumDetails', label: 'Page 17: Album Details (Ratha Yatra)', icon: 'image' },
  { id: '18', name: 'Donation', label: 'Page 18: Donation & Seva', icon: 'gift' },
  { id: '19', name: 'AboutPrabhu', label: 'Page 19: About Prabhu', icon: 'person' },
  { id: '20', name: 'ContactUs', label: 'Page 20: Contact Us & Map', icon: 'mail' },
  { id: '21', name: 'Profile', label: 'Page 21: Profile (Devotee Ananda Das)', icon: 'person-circle' },
  { id: '22', name: 'Settings', label: 'Page 22: Settings & Preferences', icon: 'settings' },
];

export const ScreenSwitcherModal: React.FC<ScreenSwitcherModalProps> = ({
  visible,
  onClose,
  onSelectScreen,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>All 22 Screens Navigator</Text>
              <Text style={styles.subtitle}>Jump to any screen from PDF instantly</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close-circle" size={28} color="#BF360C" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
            {SCREEN_LIST.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => {
                  onClose();
                  onSelectScreen(item.name);
                }}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <Text style={styles.itemName}>Route: {item.name}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D97706" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8DC',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 12,
    color: '#8D6E63',
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBF5',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  itemName: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
});
