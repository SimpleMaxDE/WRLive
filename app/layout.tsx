import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "WildLegends Hub – Wild Rift Meta Platform",
  description: "English Wild Rift platform with tier list, champion guides, builds, and ranked stats."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
