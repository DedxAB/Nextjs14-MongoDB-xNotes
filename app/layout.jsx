import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: {
    default: "DedxNotes - Digital Sticky Notes",
    template: "%s | DedxNotes",
  },
  description:
    "Welcome to our interactive note-sharing platform! Create digital sticky notes for quick recall and reference. Share your notes globally, making note-taking and idea sharing a breeze. Start organizing your thoughts today! 🌟",
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
