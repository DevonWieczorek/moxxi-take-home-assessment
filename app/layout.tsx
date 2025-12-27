import type { Metadata } from "next";
import { Lato, Fira_Sans, Inter } from "next/font/google";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Footer from "@/components/Footer";
import { classList } from "@/lib/utils";
import "@/styles/globals.css";

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
})

const firaSans = Fira_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
  weight: ['300', '400', '500', '600', '700'], // Select needed weights
});

export const metadata: Metadata = {
  title: "Benefits Access Center",
  description: "Helping you find your unclaimed money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classList([lato.variable, firaSans.variable, inter.variable])}
      >
        <DisclaimerBanner />
        <main className="min-h-screen bg-blue bg-img-flag pt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
