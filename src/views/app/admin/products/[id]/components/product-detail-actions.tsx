// src/views/app/admin/products/[id]/components/product-detail-actions.tsx
"use client";

import { Edit, Power } from "lucide-react";

import { Button, Card, CardContent, Separator } from "@/components/ui";
import { ProductDetailForAdminResponse } from "@/models/responses";

import { ProductDeleteAlert } from "./product-delete-alert";
import { ProductDiscountDialog } from "./product-discount-dialog";

interface ProductDetailActionsProps {
  product: ProductDetailForAdminResponse;
  onEdit: () => void;
  onToggleAvailability: () => void;
  onDelete: () => void;
  onUpdateDiscount: (discount: number) => void;
  isToggling?: boolean;
  isDeleting?: boolean;
  isUpdatingDiscount?: boolean;
}

export function ProductDetailActions({
  product,
  onEdit,
  onToggleAvailability,
  onDelete,
  onUpdateDiscount,
  isToggling = false,
  isDeleting = false,
  isUpdatingDiscount = false,
}: ProductDetailActionsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {!product.isDeleted && (
            <>
              <Button onClick={onEdit} className="cursor-pointer flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Editar Producto
              </Button>
              <ProductDiscountDialog
                currentDiscount={product.discount}
                onConfirm={onUpdateDiscount}
                isUpdating={isUpdatingDiscount}
              />
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
            </>
          )}
        </div>

        <Separator />

        {/* Delete Button */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-destructive">ALERTA</p>
          <p className="text-xs text-muted-foreground">
            Esta acción ocultará el producto de clientes pero se puede
            restaurar.
          </p>

          <ProductDeleteAlert
            productTitle={product.title}
            isDeleted={product.isDeleted}
            isDeleting={isDeleting}
            onConfirm={onDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
}
