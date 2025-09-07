export interface DeezerArtist {
  id: number;
  name: string;
  picture: string;
}

export interface DeezerTrack {
  id: number;
  title: string;
  preview: string;
  artist: DeezerArtist;
}

export interface DeezerChartResponse {
  tracks: {
    data: DeezerTrack[];
  };
}
