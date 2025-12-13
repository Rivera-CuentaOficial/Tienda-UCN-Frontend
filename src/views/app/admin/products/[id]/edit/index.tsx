// src/views/app/admin/products/[id]/edit/index.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";

import { UpdateProductForm, UpdateProductLoading } from "./components";
import { useUpdateProduct } from "./hooks";

interface EditProductViewProps {
  id: string;
}

export default function EditProductView({ id }: EditProductViewProps) {
  const router = useRouter();
  const { initialValues, isLoading } = useUpdateProduct(id);

  if (isLoading) {
    return <UpdateProductLoading />;
  }

  if (!initialValues) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Button
        variant="outline"
        onClick={() => router.push(`/admin/products/${id}`)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al detalle
      </Button>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Editar Producto</h1>
        <p className="text-muted-foreground">
          Modifica la información de {initialValues.title}
        </p>
      </div>

      <UpdateProductForm productId={id} />
    </div>
  );
}
