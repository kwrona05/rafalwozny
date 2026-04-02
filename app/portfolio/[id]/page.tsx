import React from "react";
import PortfolioDetailView from "@/components/PortfolioDetailView";
import { MOCK_PORTFOLIO } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_PORTFOLIO.map((item) => ({
    id: item.id,
  }));
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PortfolioDetailView id={id} />;
}
