import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface YoutubeState {
  links: Record<string, string>; // { "artist - title": videoUrl }
  loading: Record<string, boolean>;
  error: Record<string, string | null>;
}

const initialState: YoutubeState = {
  links: {},
  loading: {},
  error: {},
};

// Async thunk do pobierania linku
export const fetchYoutubeLink = createAsyncThunk(
  "youtube/fetchYoutubeLink",
  async ({ artist, title }: { artist: string; title: string }) => {
    const res = await fetch(
      `/api/youtube?q=${encodeURIComponent(artist + " " + title)}`
    );
    const data = await res.json();
    return { key: `${artist} - ${title}`, videoUrl: data.videoUrl };
  }
);

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutubeLink.pending, (state, action) => {
        const key = `${action.meta.arg.artist} - ${action.meta.arg.title}`;
        state.loading[key] = true;
        state.error[key] = null;
      })
      .addCase(
        fetchYoutubeLink.fulfilled,
        (
          state,
          action: PayloadAction<{ key: string; videoUrl: string | null }>
        ) => {
          const { key, videoUrl } = action.payload;
          state.loading[key] = false;
          if (videoUrl) state.links[key] = videoUrl;
          else state.error[key] = "Nie znaleziono wideo";
        }
      )
      .addCase(fetchYoutubeLink.rejected, (state, action) => {
        const key = `${action.meta.arg.artist} - ${action.meta.arg.title}`;
        state.loading[key] = false;
        state.error[key] = "Błąd podczas pobierania wideo";
      });
  },
});

export default youtubeSlice.reducer;
