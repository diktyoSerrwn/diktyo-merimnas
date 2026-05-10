import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ",
  description: "Η επίσημη πλατφόρμα του Δικτύου Φοιτητών Σερρών",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Εδώ εμφανίζονται οι σελίδες σου (Αρχική ή Δίκτυα) */}
          <main className="flex-grow">
            {children}
          </main>

          {/* ΤΟ EMAIL ΠΟΥ ΘΑ ΦΑΙΝΕΤΑΙ ΠΑΝΤΟΥ */}
          <footer className="py-12 border-t border-gray-200 bg-white text-center w-full">
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-gray-900 font-bold uppercase mb-2 tracking-widest text-sm">
                ΕΠΙΚΟΙΝΩΝΙΑ
              </p>
              <a 
                href="mailto:info@diktyo-serrwn.com" 
                className="text-blue-600 text-xl md:text-2xl font-black hover:text-blue-800 transition-colors"
              >
                info@diktyo-serrwn.com
              </a>
              <div className="mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                &copy; 2026 ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}