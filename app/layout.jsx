import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "DedxNotes - Share Your Notes with the World",
    template: "%s | DedxNotes",
  },
  description: "An interactive Note Sharing WebApp for Note-Taking and Ideas",
  keywords:
    "notes, productivity, online platform, notes sharing, ideas, notes app, dedxnotes productivity, dedxnotes note-taking, dedxnotes note sharing, dedxnotes notes app",
  author: "DedxAB",
  image: "https://dedxnotes.vercel.app/dedxnotes-logo.png",
  url: "https://dedxnotes.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefinSans.className}`}>
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
            <main className="max-w-3xl mx-auto px-4 mt-5">{children}</main>
            <Toaster richColors position="bottom-right" />
            {/* footer  */}
            <div className="w-full border-t mt-8">
              <Footer />
            </div>
          </ThemeProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
