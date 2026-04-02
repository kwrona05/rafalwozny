import React from "react";
import ProductDetailView from "@/components/ProductDetailView";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailView id={id} />;
}
