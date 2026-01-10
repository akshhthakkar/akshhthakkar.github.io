import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://akshthakkar.me"),
  title: {
    default: "Aksh Thakkar",
    template: "%s | Aksh Thakkar",
  },
  description:
    "Computer Engineering Student at Parul University • MERN Stack Developer • AI Enthusiast. Exploring the frontiers of web development and artificial intelligence.",
  keywords: [
    "Aksh Thakkar",
    "Aksh",
    "Thakkar",
    "Computer Engineer",
    "MERN Stack",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "AI Enthusiast",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Aksh Thakkar", url: "https://akshthakkar.me" }],
  creator: "Aksh Thakkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshthakkar.me",
    title: "Aksh Thakkar",
    description:
      "Computer Engineering Student at Parul University • MERN Stack Developer • AI Enthusiast",
    siteName: "Aksh Thakkar",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 1080,
        alt: "Aksh Thakkar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aksh Thakkar",
    description:
      "Computer Engineering Student at Parul University • MERN Stack Developer • AI Enthusiast",
    images: ["/og.png"],
    creator: "@akshhthakkar",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7WTzwBrUfmv2YeeTAVq50cPYjgRaqGAwwaj_pJ-RTjk",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[inter.variable, calSans.variable, "overflow-x-hidden"].join(
        " "
      )}
    >
      <head></head>
      <body
        className={`bg-black overflow-x-hidden ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`.trim()}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
