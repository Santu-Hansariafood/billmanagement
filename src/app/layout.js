import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://hansariafood.com"),
  title: {
    default: "Hansaria Food Private Limited",
    template: "%s | Hansaria Food Pvt. Ltd.",
  },
  description:
    "Hansaria Food Private Limited — delivering premium quality food products with trust, purity, and excellence across India.",
  keywords: [
    "Hansaria Food",
    "Hansaria Food Private Limited",
    "Premium food products",
    "Indian food distribution",
    "Hansaria Food Pvt Ltd",
  ],
  authors: [{ name: "Santu De" }],
  creator: "Santu De",
  publisher: "Hansaria Food Private Limited",

  openGraph: {
    title: "Hansaria Food Private Limited",
    description:
      "Premium food products with trust, purity and excellence across India.",
    url: "https://hansariafood.com",
    siteName: "Hansaria Food Pvt. Ltd.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hansaria Food Private Limited",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hansaria Food Private Limited",
    description: "Premium food products delivered with trust and excellence.",
    images: ["/og-image.png"],
    creator: "@developer_eye",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://hansariafood.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hansaria Food Private Limited",
              url: "https://hansariafood.com",
              logo: "https://hansariafood.com/logo.png",
              description:
                "Hansaria Food Private Limited — delivering premium quality food products across India.",
              sameAs: [
                "https://facebook.com/hansariafood",
                "https://instagram.com/hansariafood",
                "https://linkedin.com/company/hansariafood",
              ],
              founder: "Santu De",
            }),
          }}
        />

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
