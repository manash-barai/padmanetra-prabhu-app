import {
  MOCK_PROGRAMS,
  MOCK_VIDEOS,
  MOCK_AUDIOS,
  MOCK_POEM,
  MOCK_ALBUMS,
  MOCK_USER,
  NOTIFICATIONS,
} from '../data/mockData';
import { Program, VideoItem, AudioItem, PoemItem, AlbumItem, UserProfile, NotificationItem } from '../types';

/**
 * ============================================================================
 * 🌐 API CONFIGURATION & BASE URL
 * ============================================================================
 * When your backend is ready, update API_BASE_URL to your server address
 * e.g., 'https://api.padmanetraprabhu.com/v1' or 'http://localhost:8000/api'
 */
export const API_BASE_URL = 'https://api.padmanetraprabhu.com/api/v1';

// Simulated network delay for realistic UI loading states
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * ============================================================================
 * 📡 PROGRAMS API
 * ============================================================================
 */

export const apiGetTodayPrograms = async (): Promise<Program[]> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/programs/today`, {
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * if (!response.ok) throw new Error('Failed to fetch today programs');
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(150);
  return MOCK_PROGRAMS.filter((p) => p.date === '24 July 2026');
};

export const apiGetAllPrograms = async (status?: string): Promise<Program[]> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const query = status ? `?status=${status}` : '';
   * const response = await fetch(`${API_BASE_URL}/programs${query}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(200);
  if (!status || status === 'All') return MOCK_PROGRAMS;
  return MOCK_PROGRAMS.filter((p) => p.status.toUpperCase() === status.toUpperCase());
};

export const apiGetProgramById = async (id: string): Promise<Program | undefined> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/programs/${id}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(100);
  return MOCK_PROGRAMS.find((p) => p.id === id);
};

/**
 * ============================================================================
 * 🎬 VIDEOS API
 * ============================================================================
 */

export const apiGetVideos = async (category?: string, query?: string): Promise<VideoItem[]> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const params = new URLSearchParams();
   * if (category && category !== 'All') params.append('category', category);
   * if (query) params.append('q', query);
   * const response = await fetch(`${API_BASE_URL}/videos?${params.toString()}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(180);
  let list = [...MOCK_VIDEOS];
  if (category && category !== 'All') {
    list = list.filter((v) => v.category.toLowerCase() === category.toLowerCase());
  }
  if (query) {
    list = list.filter((v) => v.title.toLowerCase().includes(query.toLowerCase()));
  }
  return list;
};

export const apiGetVideoById = async (id: string): Promise<VideoItem | undefined> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/videos/${id}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(100);
  return MOCK_VIDEOS.find((v) => v.id === id);
};

/**
 * ============================================================================
 * 🎵 AUDIOS API
 * ============================================================================
 */

export const apiGetAudios = async (category?: string, query?: string): Promise<AudioItem[]> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/audios?category=${category || ''}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(150);
  let list = [...MOCK_AUDIOS];
  if (category && category !== 'All') {
    list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }
  if (query) {
    list = list.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));
  }
  return list;
};

/**
 * ============================================================================
 * 📜 POEMS API
 * ============================================================================
 */

export const apiGetPoem = async (id: string = 'poem_001'): Promise<PoemItem> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/poems/${id}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(120);
  return MOCK_POEM;
};

/**
 * ============================================================================
 * 🖼️ GALLERY & ALBUMS API
 * ============================================================================
 */

export const apiGetAlbums = async (): Promise<AlbumItem[]> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/gallery/albums`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(150);
  return MOCK_ALBUMS;
};

export const apiGetAlbumById = async (id: string): Promise<AlbumItem | undefined> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/gallery/albums/${id}`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(120);
  return MOCK_ALBUMS.find((a) => a.id === id);
};

/**
 * ============================================================================
 * 💛 DONATION API
 * ============================================================================
 */

export interface DonationRequest {
  purposeId: string;
  amount: number;
  paymentMethod: string;
  devoteeName?: string;
  phone?: string;
}

export const apiSubmitDonation = async (request: DonationRequest): Promise<{ success: boolean; transactionId: string; message: string }> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/donations/create-order`, {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify(request),
   * });
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(500);
  const txId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    transactionId: txId,
    message: `Hare Krishna! Your contribution of ₹${request.amount} has been received with gratitude.`,
  };
};

/**
 * ============================================================================
 * 👤 USER PROFILE & AUTH API
 * ============================================================================
 */

export const apiGetUserProfile = async (): Promise<UserProfile> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/user/me`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(120);
  return MOCK_USER;
};

export const apiUpdateUserProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/user/me`, {
   *   method: 'PATCH',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify(updates),
   * });
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(200);
  return { ...MOCK_USER, ...updates };
};

/**
 * ============================================================================
 * 🔔 NOTIFICATIONS API
 * ============================================================================
 */

export const apiGetNotifications = async (): Promise<NotificationItem[]> => {
  /*
   * 🔌 API INTEGRATION PLACEHOLDER:
   * -------------------------------------------------------------
   * const response = await fetch(`${API_BASE_URL}/notifications`);
   * return await response.json();
   * -------------------------------------------------------------
   */
  await delay(100);
  return NOTIFICATIONS;
};
