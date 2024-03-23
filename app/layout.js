import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProviders } from "./Providers";
import NavbarComp from "@/components/navbar/NavbarComp";

export const metadata = {
  title: "Home | DedxNotes",
  description: "Created by DedxAB, this is a simple note-taking app.",
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
              <NavbarComp />
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
