import { create } from 'zustand';

export type LanguageCode = 'bn' | 'en' | 'hi';

export interface LanguageInfo {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  charSymbol: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali', charSymbol: 'অ' },
  { code: 'en', nativeName: 'English', englishName: 'English', charSymbol: 'A' },
  { code: 'hi', nativeName: 'Hindi', englishName: 'हिंदी', charSymbol: 'अ' },
];

interface AppState {
  language: LanguageCode;
  isDarkMode: boolean;
  bookmarkedIds: string[];
  reminderProgramIds: string[];
  unreadNotificationCount: number;
  hasSeenOnboarding: boolean;
  
  // Actions
  setLanguage: (lang: LanguageCode) => void;
  toggleDarkMode: () => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  toggleReminder: (programId: string) => void;
  hasReminder: (programId: string) => boolean;
  markNotificationsAsRead: () => void;
  setHasSeenOnboarding: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  language: 'en',
  isDarkMode: false,
  bookmarkedIds: ['vid_001', 'poem_001'],
  reminderProgramIds: ['prog_001'],
  unreadNotificationCount: 3,
  hasSeenOnboarding: false,

  setLanguage: (lang) => set({ language: lang }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  toggleBookmark: (id) => {
    const { bookmarkedIds } = get();
    if (bookmarkedIds.includes(id)) {
      set({ bookmarkedIds: bookmarkedIds.filter((item) => item !== id) });
    } else {
      set({ bookmarkedIds: [...bookmarkedIds, id] });
    }
  },

  isBookmarked: (id) => get().bookmarkedIds.includes(id),

  toggleReminder: (programId) => {
    const { reminderProgramIds } = get();
    if (reminderProgramIds.includes(programId)) {
      set({ reminderProgramIds: reminderProgramIds.filter((item) => item !== programId) });
    } else {
      set({ reminderProgramIds: [...reminderProgramIds, programId] });
    }
  },

  hasReminder: (programId) => get().reminderProgramIds.includes(programId),

  markNotificationsAsRead: () => set({ unreadNotificationCount: 0 }),
  setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),
}));
