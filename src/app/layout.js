import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Potro Mercado",
  },
  description: "Un mercado para universitarios",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/icon.png" as="image/png" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
