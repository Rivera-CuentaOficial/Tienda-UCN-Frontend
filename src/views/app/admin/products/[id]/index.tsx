"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui";
import { handleApiError } from "@/lib";

import {
  ProductDetailActions,
  ProductDetailCard,
  ProductDetailEmpty,
  ProductDetailError,
  ProductDetailHeader,
  ProductDetailImages,
  ProductDetailLoading,
} from "./components";
import { useProductDetailAdmin } from "./hooks";

interface AdminProductDetailViewProps {
  id: string;
}

export default function AdminProductDetailView({
  id,
}: AdminProductDetailViewProps) {
  const { productDetail, isLoading, error, actions } =
    useProductDetailAdmin(id);

  if (isLoading) {
    return <ProductDetailLoading />;
  }

  if (error) {
    const apiError = handleApiError(error);
    return (
      <ProductDetailError
        error={apiError.details}
        onGoBack={actions.handleGoBack}
      />
    );
  }

  if (!productDetail) {
    return <ProductDetailEmpty onGoBack={actions.handleGoBack} />;
  }

  const discountedPrice = actions.handleCalculateDiscountedPrice(
    productDetail.price,
    productDetail.discount
  );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Back button */}
      <Button variant="outline" onClick={actions.handleGoBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a productos
      </Button>
      {/* Product Detail Header */}
      <ProductDetailHeader productDetail={productDetail} />
      {/* Product Detail Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images carousel */}
        <ProductDetailImages
          imageUrls={productDetail.imagesURL}
          productTitle={productDetail.title}
        />
        {/* Product Info Card */}
        <ProductDetailCard
          productDetail={productDetail}
          discountedPrice={discountedPrice}
        />
      </div>
      {/* Admin actions */}
      <ProductDetailActions
        product={productDetail}
        onEdit={() => {
          /* TODO: Navigate to edit page */
        }}
        onToggleAvailability={() => {
          actions.handleToggleAvailability(productDetail.id.toString());
        }}
      />
    </div>
  );
}
