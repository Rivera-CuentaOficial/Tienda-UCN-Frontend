"use client";

import { Button, Card, CardContent } from "@/components/ui";

interface ProductDetailEmptyProps {
  onGoBack: () => void;
}

export function ProductDetailEmpty({ onGoBack }: ProductDetailEmptyProps) {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Producto no encontrado</h2>
          <p className="text-muted-foreground">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Button onClick={onGoBack} variant="outline">
            Volver a productos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
