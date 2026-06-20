import React from "react";
import PortfolioDetailView from "@/components/PortfolioDetailView";
import { MOCK_PORTFOLIO } from "@/lib/mock-data";
import { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_PORTFOLIO.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = MOCK_PORTFOLIO.find(p => p.id === id);
  if (!item) {
    return {
      title: "Wpis nieznaleziony | Rafał Woźny Photography",
    };
  }

  return {
    title: `${item.title} | Rafał Woźny Photography`,
    description: item.shortDescription,
    alternates: {
      canonical: `https://rafalwozny.pl/portfolio/${id}`,
    },
    openGraph: {
      title: `${item.title} | Rafał Woźny Photography`,
      description: item.shortDescription,
      url: `https://rafalwozny.pl/portfolio/${id}`,
      images: [
        {
          url: item.image,
          alt: item.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PortfolioDetailView id={id} />;
}
