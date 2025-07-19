
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Inter, Poppins } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '700']
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['500', '700']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hacked News - Top Tech Stories & Startup News | Modern Tech Dashboard",
  description: "Stay ahead with the latest tech stories, startup news, and programming insights from Hacker News. Modern, responsive dashboard for developers and tech enthusiasts.",
  keywords: "tech news, hacker news, startup news, programming, AI, technology, developer news, tech stories",
  authors: [{ name: "Hacked News Team" }],
  creator: "Hacked News",
  publisher: "Hacked News",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hackednews.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hacked News - Top Tech Stories & Startup News",
    description: "Discover the latest tech stories, startup news, and programming insights in a modern, responsive dashboard designed for developers and tech enthusiasts.",
    url: 'https://hackednews.app',
    siteName: 'Hacked News',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hacked News - Modern Tech Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hacked News - Top Tech Stories & Startup News",
    description: "Stay ahead with the latest tech stories and startup news in our modern dashboard.",
    images: ['/twitter-image.jpg'],
    creator: '@hackednews',
    site: '@hackednews',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#FF6F00" />
        <meta name="msapplication-TileColor" content="#FF6F00" />
        
        {/* Preconnect to External Domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hacker-news.firebaseio.com" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//hacker-news.firebaseio.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content="Hacked News" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hacked News" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Hacked News",
              "description": "Modern tech news aggregator featuring top stories from Hacker News",
              "url": "https://hackednews.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://hackednews.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${inter.variable} ${poppins.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
