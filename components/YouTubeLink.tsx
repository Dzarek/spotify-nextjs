"use client";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchYoutubeLink } from "@/store/youtubeSlice";
import { FaYoutube } from "react-icons/fa";
import { Track } from "@/store/playerSlice";

const YouTubeLink = ({ song, player }: { song: Track; player: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();

  const key = `${song.artist.name} - ${song.title}`;
  const videoUrl = useSelector((state: RootState) => state.youtube.links[key]);
  const loading = useSelector(
    (state: RootState) => state.youtube.loading[key] ?? false
  );
  const error = useSelector((state: RootState) => state.youtube.error[key]);

  const openYoutube = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    } else {
      dispatch(
        fetchYoutubeLink({ artist: song.artist.name, title: song.title })
      )
        .unwrap()
        .then((res) => {
          if (res.videoUrl) {
            window.open(res.videoUrl, "_blank");
          } else {
            alert("Nie znaleziono wideo");
          }
        })
        .catch(() => {
          alert("Błąd podczas pobierania wideo");
        });
    }
  };

  return (
    <>
      {player ? (
        <button
          onClick={openYoutube}
          className="text-sm text-white flex flex-col justify-center items-center font-bold cursor-pointer  duration-300 opacity-80 hover:opacity-100"
          disabled={loading}
          title={error ? error : "Otwórz w YouTube"}
        >
          <FaYoutube className="text-purple-800 text-4xl " />
          Otwórz w YouTube
        </button>
      ) : (
        <button
          onClick={openYoutube}
          className="text-base bg-white p-2 px-4 rounded-xl text-purple-800 font-bold cursor-pointer hover:text-zinc-900 duration-300"
          disabled={loading}
          title={error ? error : "Otwórz w YouTube"}
        >
          Otwórz w YouTube
        </button>
      )}
    </>
  );
};

export default YouTubeLink;
