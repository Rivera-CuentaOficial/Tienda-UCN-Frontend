// src/views/app/admin/products/[id]/components/product-deleted-banner.tsx
"use client";

import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui";

interface ProductDeletedBannerProps {
  productTitle: string;
  deletedAt: string | null;
}

export function ProductDeletedBanner({
  productTitle,
  deletedAt,
}: ProductDeletedBannerProps) {
  const formatDate = (date: string | null) => {
    if (!date) return "Fecha desconocida";
    return new Date(date).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon and message */}
          <div className="flex items-start gap-3 flex-1">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-2">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                Producto Eliminado
              </h3>
              <p className="text-sm text-orange-800 dark:text-orange-200">
                <span className="font-medium">{productTitle}</span> fue
                eliminado el {formatDate(deletedAt)}.
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300">
                Los clientes no pueden ver ni comprar este producto.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
