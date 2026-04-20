import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";
import { RoleProvider } from "@/components/RoleContext";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio — Product Designer",
  description: "Product designer crafting clean, user-centered digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <RoleProvider>
              {children}
              <ScrollToTop />
            </RoleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
