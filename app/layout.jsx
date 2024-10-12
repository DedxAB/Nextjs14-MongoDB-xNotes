import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { NextAuthProviders } from './Providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BottomNavbar from '@/components/BottomNavbar/BottomNavbar';
import { Toaster } from '@/components/ui/sonner';
import { SavedNotesProvider } from '@/context/SavedNotesContext';
import { BASE_URL } from '@/utils/constants';

const DESCRIPTION =
  'Create notes for quick recall and reference. Share your notes globally, making note-taking and idea sharing a breeze. Start organizing your thoughts today!';
const TITLE = 'DedxNotes - Digital Sticky Notes';
const KEYWORDS =
  'notes, sticky notes, digital sticky note, recall notes, productivity, online platform, notes sharing, ideas, notes app, dedxnotes productivity, dedxnotes note-taking, dedxnotes note sharing, dedxnotes notes app';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s | DedxNotes',
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  creator: 'DedxAB - Arnab Bhoumik',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    url: `/`,
    siteName: 'DedxNotes',
  },
  manifest: '/manifest.json',
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
            <SavedNotesProvider>
              {/* navbar */}
              <div className="w-full sticky top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b z-10">
                <Navbar />
              </div>

              {/* main content */}
              <main className="max-w-3xl mx-auto mb-48 sm:mb-0 px-4 min-h-full sm:min-h-screen">
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
            </SavedNotesProvider>
          </ThemeProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
