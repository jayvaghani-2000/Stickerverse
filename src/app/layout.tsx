import classNames from "classnames";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import "./globals.scss";
import ThemeProvider from "./theme/themeProvider";
import "./variables.scss";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sticker Verse",
  description:
    "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
  twitter: {
    card: "summary_large_image",
    title: `Sticker verse`,
    description:
      "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/logo/logo.png`,
      },
    ],
  },
  openGraph: {
    type: "website",
    title: `Sticker verse`,
    description:
      "Explore StickerVerse, where every amusing, eccentric, and side-splitting sticker comes to life! We've got a vast collection of funny stickers for you to discover and enjoy.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/logo/logo.png`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider className={classNames(poppins.className, "bg-primary")}>
      {children}
    </ThemeProvider>
  );
}
