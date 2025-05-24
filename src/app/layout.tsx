import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers/root_provider";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seven Wonders Herramienta en Solitario",
  description:
    "Jugá al juego de mesa Seven Wonders en solitario con esta herramienta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased dark`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
