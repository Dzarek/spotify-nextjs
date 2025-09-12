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
  }),
});

export const { useGetTopChartsQuery } = deezerApi;
