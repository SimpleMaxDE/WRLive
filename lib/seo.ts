import { Metadata } from "next";

export function buildMetadata(title: string, description: string, path: string): Metadata {
  const url = `https://www.riftkompass.de${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "RiftKompass",
      locale: "de_DE",
      type: "website"
    }
  };
}
