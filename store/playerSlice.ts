import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
}

interface PlayerState {
  activeSong: Track | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  activeSong: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action: PayloadAction<Track>) => {
      state.activeSong = action.payload;
      state.isPlaying = true;
    },
    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, playPause } = playerSlice.actions;
export default playerSlice.reducer;
