import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Deezer App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
