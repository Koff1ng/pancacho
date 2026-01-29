import type { Metadata } from "next";
import { Bebas_Neue, Host_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartPanel } from "./components/CartPanel";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const host = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
});

export const metadata: Metadata = {
  title: "Humo Barriles - Asadores de Barril",
  description: "Los mejores asadores de barril para tus asados. Envíos a todo Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bebas.variable} ${host.variable} antialiased font-sans bg-black text-white`}>
        <CartProvider>
          {children}
          <CartPanel />
          <a
            href="https://wa.me/573100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.991.56 1.748.835 2.766.836h.001c3.181 0 5.768-2.586 5.769-5.766.001-1.541-.599-2.989-1.688-4.079C15.013 6.772 13.568 6.172 12.031 6.172zm5.727 7.766c-.234.664-1.36 1.226-1.898 1.282-.544.055-.71.127-2.607-.665-2.049-.861-3.351-2.988-3.454-3.125-.1.141-.825 1.103-.825 2.106 0 1.002.518 1.492.709 1.706.191.214.436.321.436.321s.145.748.832 1.057c.48.214.857.243 1.154.218.349-.03.774-.316.883-.624.11-.309.11-.571.077-.624-.033-.053-.124-.084-.261-.153z" />
            </svg>
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
