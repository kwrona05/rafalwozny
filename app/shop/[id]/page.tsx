import React from "react";
import ProductDetailView from "@/components/ProductDetailView";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) {
    return {
      title: "Produkt nieodnaleziony | Sklep | Rafał Woźny Photography",
    };
  }

  return {
    title: `${product.name} | Sklep | Rafał Woźny Photography`,
    description: product.description,
    alternates: {
      canonical: `https://rafalwozny.pl/shop/${id}`,
    },
    openGraph: {
      title: `${product.name} | Sklep | Rafał Woźny Photography`,
      description: product.description,
      url: `https://rafalwozny.pl/shop/${id}`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailView id={id} />;
}
