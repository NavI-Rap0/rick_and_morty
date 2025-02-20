import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { LoaderProvider } from "../utils/contextLoader";
import Loader from "../components/Loader";
import SpaceBackground from "../components/SpaceBgr/SpaceBackground";

export const metadata = {
  title: "Rick and Morty",
  icons: {
    icon: "/rick-morty-13.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body id="app-container">
        <SpaceBackground />
        <LoaderProvider>
          <Navbar />
          <div>
            <Loader />
            {children}
          </div>
        </LoaderProvider>
      </body>
    </html>
  );
}

