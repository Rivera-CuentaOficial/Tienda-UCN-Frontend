"use client";

import { Archive } from "lucide-react";

import { Badge } from "@/components/ui";
import { ProductDetailForAdminResponse } from "@/models/responses";

interface ProductDetailHeaderProps {
  productDetail: ProductDetailForAdminResponse;
}

export function ProductDetailHeader({
  productDetail,
}: ProductDetailHeaderProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {productDetail.title}
          </h1>
          {productDetail.isDeleted && (
            <Badge variant="destructive" className="inline-flex items-center">
              <Archive className="h-4 w-4 mr-1" />
              Producto Eliminado
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">ID: {productDetail.id}</p>
      </div>

      <div className="flex flex-col gap-2">
        {!productDetail.isDeleted && (
          <Badge
            variant={productDetail.isAvailable ? "default" : "destructive"}
          >
            {productDetail.isAvailable ? "Disponible" : "No disponible"}
          </Badge>
        )}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Creado: {formatDate(productDetail.createdAt)}</p>
          <p>Actualizado: {formatDate(productDetail.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}
