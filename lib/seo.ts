import { Metadata } from "next";

export function buildMetadata(title: string, description: string, path: string): Metadata {
  const url = `https://www.wildlegendshub.com${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "WildLegends Hub",
      locale: "en_US",
      type: "website"
    }
  };
}
