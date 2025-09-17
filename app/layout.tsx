import Navbar from "@/components/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import { Saira_Condensed } from "next/font/google";
import MiniPlayer from "@/components/MiniPlayer";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

export const metadata = {
  title: "Music App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={saira.className}>
        <Providers>
          <VideoBackground />
          <div className="w-full md:w-4/5 md:mr-[20%] relative z-10 flex flex-col bg-[rgba(0,0,0,0.7)]">
            <main className="flex-1 p-2 md:p-10">{children}</main>
            <Footer />
            <MiniPlayer />
          </div>
          <div className="w-1/5 fixed top-0 right-0 h-screen z-20">
            <Navbar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
