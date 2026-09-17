import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LanguageSelectScreen } from '../screens/LanguageSelectScreen';
import { WelcomeAuthScreen } from '../screens/WelcomeAuthScreen';
import { TabNavigator } from './TabNavigator';
import { TodayProgramsScreen } from '../screens/TodayProgramsScreen';
import { ProgramDetailsScreen } from '../screens/ProgramDetailsScreen';
import { ProgramsCalendarScreen } from '../screens/ProgramsCalendarScreen';
import { AllProgramsScreen } from '../screens/AllProgramsScreen';
import { VideoLibraryScreen } from '../screens/VideoLibraryScreen';
import { VideoDetailsScreen } from '../screens/VideoDetailsScreen';
import { AudioLibraryScreen } from '../screens/AudioLibraryScreen';
import { PoemDetailsScreen } from '../screens/PoemDetailsScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { AlbumDetailsScreen } from '../screens/AlbumDetailsScreen';
import { DonationScreen } from '../screens/DonationScreen';
import { AboutPrabhuScreen } from '../screens/AboutPrabhuScreen';
import { BiographyScreen } from '../screens/BiographyScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
        <Stack.Screen name="WelcomeAuth" component={WelcomeAuthScreen} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
        <Stack.Screen name="TodayPrograms" component={TodayProgramsScreen} />
        <Stack.Screen name="ProgramDetails" component={ProgramDetailsScreen} />
        <Stack.Screen name="ProgramsCalendar" component={ProgramsCalendarScreen} />
        <Stack.Screen name="AllPrograms" component={AllProgramsScreen} />
        <Stack.Screen name="VideoLibrary" component={VideoLibraryScreen} />
        <Stack.Screen name="VideoDetails" component={VideoDetailsScreen} />
        <Stack.Screen name="AudioLibrary" component={AudioLibraryScreen} />
        <Stack.Screen name="PoemDetails" component={PoemDetailsScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
        <Stack.Screen name="Donation" component={DonationScreen} />
        <Stack.Screen name="AboutPrabhu" component={AboutPrabhuScreen} />
        <Stack.Screen name="Biography" component={BiographyScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
