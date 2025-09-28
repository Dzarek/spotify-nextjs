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

export type DeezerGenre = {
  id: number;
  name: string;
  picture_medium: string;
  type: "genre";
};
export type DeezerGenreResponse = {
  data: DeezerGenre[];
};
