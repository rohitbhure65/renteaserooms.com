import { Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.scss";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "RentEaseRooms",
  description: "Find Your Perfect Place With The RentEaseRooms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <NextTopLoader
          color="#FF5A5F"
          easing="ease"
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          speed={200}
          height={3}
          showSpinner={false}
          initialPosition={0.08}
          crawlSpeed={200}
        />
        {children}
      </body>
    </html>
  );
}
