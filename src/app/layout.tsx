import { Nunito } from "next/font/google";
// import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "RentEaseRooms",
  description: "Find Your Perfect Place With The RentEaseRooms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
