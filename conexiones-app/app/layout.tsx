import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conexiones | Un espectáculo de Rafael Gorrochotegui",
  description:
    "Hay hilos que no se ven. Esta noche, sí. Magia y mentalismo en vivo con Rafael Gorrochotegui. Sábado 29 de agosto, Teatro Ocho, Las Mercedes, Caracas.",
  openGraph: {
    title: "Conexiones | Un espectáculo de Rafael Gorrochotegui",
    description:
      "Magia y mentalismo en vivo. Sábado 29 de agosto, Teatro Ocho, Las Mercedes, Caracas.",
    locale: "es_VE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
