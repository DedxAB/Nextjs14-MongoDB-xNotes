import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: {
    default: "DedxNotes - A Note sharing Platform",
    template: "%s | DedxNotes",
  },
  description: "A Note sharing WebApp - Share your notes with the world",
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
