import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Премиальная Красная Икра - Высшее Качество",
  description: "Самая свежая русская икра высочайшего качества. Натуральные морские деликатесы с доставкой.",
  keywords: "красная икра, премиальная икра, морские деликатесы, русская икра, купить икру",
  openGraph: {
    title: "Премиальная Красная Икра - Высшее Качество",
    description: "Самая свежая русская икра высочайшего качества с доставкой",
    images: [
      {
        url: "/image/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Премиальная красная икра",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Премиальная Красная Икра - Высшее Качество",
    description: "Самая свежая русская икра высочайшего качества с доставкой",
    images: ["/image/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("http://ikraluxe.ru"),
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/ru",
      "uk-UA": "/ua",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header/>
      
        {children}
        <Footer/>
      </body>
      
    </html>
  );
}
