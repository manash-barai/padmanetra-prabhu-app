import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/useAppStore';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  onSearch?: () => void;
  showFilter?: boolean;
  onFilter?: () => void;
  showNotification?: boolean;
  onNotification?: () => void;
  showShare?: boolean;
  onShare?: () => void;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showCalendarAdd?: boolean;
  onCalendarAdd?: () => void;
  isHomeHeader?: boolean;
  onOpenMenu?: () => void;
  rightCustomAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  showSearch = false,
  onSearch,
  showFilter = false,
  onFilter,
  showNotification = false,
  onNotification,
  showShare = false,
  onShare,
  showFavorite = false,
  isFavorite = false,
  onToggleFavorite,
  showCalendarAdd = false,
  onCalendarAdd,
  isHomeHeader = false,
  onOpenMenu,
  rightCustomAction,
}) => {
  const navigation = useNavigation<any>();
  const unreadCount = useAppStore((state) => state.unreadNotificationCount);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.contentRow}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity onPress={handleBack} style={styles.iconButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ) : isHomeHeader ? (
            <TouchableOpacity onPress={onOpenMenu} style={styles.iconButton}>
              <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}

          <View style={styles.titleWrapper}>
            {isHomeHeader ? (
              <>
                <Text style={styles.homeGreeting}>Hare Krishna 🙏</Text>
                <Text style={styles.homeSubGreeting} numberOfLines={1}>
                  Welcome to Padmanetra Prabhu Official App
                </Text>
              </>
            ) : (
              <>
                {title && <Text style={styles.titleText} numberOfLines={1}>{title}</Text>}
                {subtitle && <Text style={styles.subtitleText} numberOfLines={1}>{subtitle}</Text>}
              </>
            )}
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity onPress={onSearch} style={styles.iconButton}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {showFilter && (
            <TouchableOpacity onPress={onFilter} style={styles.iconButton}>
              <Ionicons name="filter-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {showCalendarAdd && (
            <TouchableOpacity onPress={onCalendarAdd} style={styles.iconButton}>
              <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {showShare && (
            <TouchableOpacity onPress={onShare} style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {showFavorite && (
            <TouchableOpacity onPress={onToggleFavorite} style={styles.iconButton}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#FEE2E2' : '#FFFFFF'}
              />
            </TouchableOpacity>
          )}

          {showNotification && (
            <TouchableOpacity onPress={onNotification} style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {rightCustomAction}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingTop: 46,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#BF360C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconButton: {
    padding: 6,
    marginRight: 6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 4,
  },
  homeGreeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  homeSubGreeting: {
    fontSize: 11,
    color: '#FFE0B2',
    marginTop: 2,
    fontWeight: '400',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitleText: {
    fontSize: 11,
    color: '#FFE0B2',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FFEB3B',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#BF360C',
    fontSize: 9,
    fontWeight: '800',
  },
});
