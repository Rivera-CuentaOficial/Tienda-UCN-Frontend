// src/views/app/admin/products/[id]/components/product-delete-dialog.tsx
"use client";

import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";

interface ProductDeleteAlertProps {
  productTitle: string;
  isDeleted: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
}

export function ProductDeleteAlert({
  productTitle,
  isDeleted,
  isDeleting,
  onConfirm,
}: ProductDeleteAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
          disabled={isDeleting || isDeleted}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleted ? "Producto Eliminado" : "Eliminar Producto"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará temporalmente el producto{" "}
            <span className="font-semibold">{productTitle}</span>. Los clientes
            no podrán verlo ni comprarlo, pero podrás restaurarlo más adelante.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
