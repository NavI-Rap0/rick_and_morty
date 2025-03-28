import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import { LoaderProvider } from "@/utils/contextLoader";
import Loader from "@/components/Loader/Loader";
import SpaceBackground from "@/components/SpaceBgr/SpaceBackground";

export const metadata = {
  title: "Rick and Morty",
  icons: {
    icon: "/rick-morty-13.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body id="app-container">
        <SpaceBackground />
        <LoaderProvider>
          <Navbar />
          <Loader />
          {children}
        </LoaderProvider>
      </body>
    </html>
  );
}


