import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

export const metadata = {
  title: {
    default: "DedxNotes - Digital Sticky Notes",
    template: "%s - DedxNotes",
  },
  description:
    "An interactive note-sharing platform! Create digital sticky notes for quick recall and reference. Share your notes globally, making note-taking and idea sharing a breeze. Start organizing your thoughts today! 🌟",
  keywords:
    "notes, sticky notes, digital sticky note, recall notes, productivity, online platform, notes sharing, ideas, notes app, dedxnotes productivity, dedxnotes note-taking, dedxnotes note sharing, dedxnotes notes app",
  creator: "DedxAB - Arnab Bhoumik",
  image: "https://dedxnotes.vercel.app/dedxnotes-logo.png",
  url: "https://dedxnotes.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="SCWWex-_dojcnXNbc-7gXDrfq1JlM48mh18Ez1y3Ebo"
        />
      </head>
      <body>
        <NextAuthProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* navbar */}
            <div className="w-full sticky top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b z-10">
              <Navbar />
            </div>

            {/* main content */}
            <main className="max-w-3xl mx-auto px-4 min-h-[120vh]">
              {children}
            </main>
            <Toaster richColors position="top-right" closeButton />

            {/* bottom navbar */}
            <div className="fixed bottom-0 z-10 sm:hidden backdrop-filter backdrop-blur-lg bg-opacity-30 border-t w-full">
              <BottomNavbar />
            </div>

            {/* footer  */}
            <div className="w-full border-t mt-16 hidden sm:block">
              <Footer />
            </div>
          </ThemeProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
