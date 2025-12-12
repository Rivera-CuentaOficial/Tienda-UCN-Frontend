// src/views/app/admin/products/[id]/components/product-detail-actions.tsx
"use client";

import { Edit, Power } from "lucide-react";

import { Button, Card, CardContent } from "@/components/ui";
import { ProductDetailForAdminResponse } from "@/models/responses";

interface ProductDetailActionsProps {
  product: ProductDetailForAdminResponse;
  onEdit: () => void;
  onToggleAvailability: () => void;
  isToggling?: boolean;
}

export function ProductDetailActions({
  product,
  onEdit,
  onToggleAvailability,
  isToggling = false,
}: ProductDetailActionsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onEdit} className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Editar Producto
          </Button>

          <Button
            variant={product.isAvailable ? "destructive" : "default"}
            onClick={onToggleAvailability}
            disabled={isToggling}
            className="cursor-pointer flex-1"
          >
            <Power className="h-4 w-4 mr-2" />
            {isToggling
              ? "Procesando..."
              : product.isAvailable
                ? "Desactivar"
                : "Activar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
