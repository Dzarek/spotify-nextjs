import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DeezerChartResponse } from "@/types/deezer";

export const deezerApi = createApi({
  reducerPath: "deezerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/deezer",
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query<DeezerChartResponse, number | void>({
      query: (limit = 50) => `/top-charts?limit=${limit}`, // <-- dynamiczne limit
    }),
    searchTracks: builder.query({
      query: (query: string) =>
        `/search?q=${encodeURIComponent(query)}&limit=20`,
    }),
    getGenres: builder.query({
      query: () => "/genres",
    }),
    getGenreTracks: builder.query({
      query: ({ genreId, limit = 50, index }) =>
        `/genres/${genreId}/tracks?limit=${limit}&index=${index}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useSearchTracksQuery,
  useGetGenresQuery,
  useGetGenreTracksQuery,
} = deezerApi;
