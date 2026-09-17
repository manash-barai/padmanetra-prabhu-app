export type ProgramStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED';

export interface Program {
  id: string;
  title: string;
  speaker: string;
  speakerTitle?: string;
  date: string;          // e.g. '24 July 2026'
  dayOfWeek?: string;    // e.g. 'Thursday'
  time: string;          // e.g. '7:30 AM - 8:30 AM'
  timeZone?: string;     // e.g. '(IST)'
  venue: string;         // e.g. 'Mayapur Dham'
  fullVenue?: string;    // e.g. 'Bhagavatam Hall, Sri Mayapur Dham, Nadia, West Bengal, India'
  organizedBy?: string;  // e.g. 'ISKCON Mayapur'
  status: ProgramStatus;
  statusBadgeText?: string; // e.g. 'LIVE NOW', 'Starts in 5h 29m'
  description?: string;
  imageUrl?: string;
  isFavorite?: boolean;
  hasReminder?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  speaker: string;
  speakerVerified?: boolean;
  venue: string;
  views: string;          // e.g. '12.5K views'
  date: string;           // e.g. '24 July 2026' or '2 days ago'
  duration: string;       // e.g. '48:32'
  category: 'All' | 'Bhagavatam' | 'House Program' | 'Festival' | 'Seminar' | 'Q&A';
  thumbnail: string;
  description: string;
  videoUrl?: string;
  likesCount?: number;
  isBookmarked?: boolean;
}

export interface AudioItem {
  id: string;
  title: string;
  speaker: string;
  date: string;           // e.g. '22 July 2026'
  plays: string;          // e.g. '12.5K Plays'
  duration: string;       // e.g. '24:35'
  category: 'All' | 'Bhagavatam' | 'Kirtan' | 'Lectures' | 'Seminar' | 'Q&A';
  thumbnail: string;
  audioUrl: string;
  isDownloaded?: boolean;
}

export interface PoemItem {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  artworkUrl: string;
  verses: string[];
  audioDuration: string;
  audioUrl?: string;
  isBookmarked?: boolean;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  location: string;
  date: string;
  photoCount: number;
  coverImage: string;
  category: 'festival' | 'other';
  description?: string;
  photos: PhotoItem[];
}

export interface DonationPurpose {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type PaymentMethod = 'UPI' | 'Bank' | 'QR' | 'International';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: string;
  joinDate: string;
  preferredLanguage: 'bn' | 'en' | 'hi';
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  type: 'program' | 'video' | 'general';
}
