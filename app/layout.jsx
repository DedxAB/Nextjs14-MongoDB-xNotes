import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Home | DedxNotes",
  description: "Created by DedxAB, This is a note-taking app.",
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
            <div className="max-w-3xl mx-auto p-4">
              <Navbar />
              <main className="mt-5">{children}</main>
              <Toaster richColors position="bottom-right" />
              {/* footer  */}
            </div>
          </ThemeProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
