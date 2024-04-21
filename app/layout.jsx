import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: {
    default: "DedxNotes - Share Your Notes with the World",
    template: "%s | DedxNotes",
  },
  description:
    "An interactive Note Sharing app for Note-Taking and Ideas, Share your Notes with the World!🌍. Your go-to platform for digital sticky notes for easy recall and reference, making note-taking and idea sharing a breeze. Start organizing your thoughts today!",
  keywords:
    "notes, sticky notes, digital sticky note, recall notes, productivity, online platform, notes sharing, ideas, notes app, dedxnotes productivity, dedxnotes note-taking, dedxnotes note sharing, dedxnotes notes app",
  author: "DedxAB",
  image: "https://dedxnotes.vercel.app/dedxnotes-logo.png",
  url: "https://dedxnotes.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <main className="max-w-3xl mx-auto px-4">{children}</main>
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
