import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BottomNavbar from '@/components/BottomNavbar/BottomNavbar';
import { BASE_URL } from '@/utils/constants';
import AppProvider from '@/context/AppProvider';
import { NextAuthProviders } from './Providers';

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
            <AppProvider>
              {/* navbar */}
              <div className="sticky top-0 left-0 w-full border-b bg-opacity-30 backdrop-filter backdrop-blur-lg z-10">
                <Navbar />
              </div>

              <div>{children}</div>

              {/* toaster */}
              <Toaster richColors position="top-right" closeButton />

              {/* bottom navbar */}
              <div className="fixed bottom-0 z-10 w-full sm:hidden border-t backdrop-filter backdrop-blur-lg bg-opacity-30">
                <BottomNavbar />
              </div>

              {/* footer  */}
              <div className="hidden sm:block mt-16 w-full border-t">
                <Footer />
              </div>
            </AppProvider>
          </ThemeProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
