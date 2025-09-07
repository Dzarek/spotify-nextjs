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
  album: { cover_medium: string };
}

export interface DeezerChartResponse {
  tracks: {
    data: DeezerTrack[];
  };
}
