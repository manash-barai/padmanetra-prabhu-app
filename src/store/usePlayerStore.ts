import { create } from 'zustand';
import { AudioItem } from '../types';
import { MOCK_AUDIOS } from '../data/mockData';

interface PlayerState {
  currentTrack: AudioItem | null;
  isPlaying: boolean;
  position: number;    // seconds
  duration: number;    // seconds
  playlist: AudioItem[];
  currentIndex: number;

  playTrack: (track: AudioItem) => void;
  togglePlayPause: () => void;
  pause: () => void;
  play: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (sec: number) => void;
  closePlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: MOCK_AUDIOS[0], // default to first track so mini-player is visible as in Page 14
  isPlaying: false,
  position: 120, // 2 mins in
  duration: 1475, // 24:35 in sec
  playlist: MOCK_AUDIOS,
  currentIndex: 0,

  playTrack: (track) => {
    const { playlist } = get();
    const idx = playlist.findIndex((t) => t.id === track.id);
    set({
      currentTrack: track,
      isPlaying: true,
      currentIndex: idx !== -1 ? idx : 0,
      position: 0,
    });
  },

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  pause: () => set({ isPlaying: false }),
  play: () => set({ isPlaying: true }),

  nextTrack: () => {
    const { playlist, currentIndex } = get();
    const nextIdx = (currentIndex + 1) % playlist.length;
    set({
      currentTrack: playlist[nextIdx],
      currentIndex: nextIdx,
      position: 0,
      isPlaying: true,
    });
  },

  prevTrack: () => {
    const { playlist, currentIndex } = get();
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    set({
      currentTrack: playlist[prevIdx],
      currentIndex: prevIdx,
      position: 0,
      isPlaying: true,
    });
  },

  seekTo: (sec) => set({ position: sec }),
  closePlayer: () => set({ currentTrack: null, isPlaying: false }),
}));
