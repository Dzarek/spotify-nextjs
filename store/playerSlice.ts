import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium?: string };
}

interface PlayerState {
  queue: Track[];
  currentIndex: number;
  activeSong: Track | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  queue: [],
  currentIndex: 0,
  activeSong: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload;
      state.currentIndex = 0;
      // state.activeSong = action.payload[0] || null;
    },
    setActiveSong: (state, action: PayloadAction<Track>) => {
      state.activeSong = action.payload;
      state.currentIndex = state.queue.findIndex(
        (t) => t.preview === action.payload.preview
      );
      state.isPlaying = true;
    },
    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    nextSong: (state) => {
      if (state.queue.length === 0) return;
      state.currentIndex = (state.currentIndex + 1) % state.queue.length;
      state.activeSong = state.queue[state.currentIndex];
      state.isPlaying = true;
    },
    prevSong: (state) => {
      if (state.queue.length === 0) return;
      state.currentIndex =
        (state.currentIndex - 1 + state.queue.length) % state.queue.length;
      state.activeSong = state.queue[state.currentIndex];
      state.isPlaying = true;
    },
  },
});

export const { setQueue, setActiveSong, playPause, nextSong, prevSong } =
  playerSlice.actions;
export default playerSlice.reducer;
