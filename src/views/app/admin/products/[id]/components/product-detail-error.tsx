"use client";

import { Button, Card, CardContent } from "@/components/ui";

interface ProductDetailErrorProps {
  error?: string;
  onGoBack: () => void;
}

export function ProductDetailError({
  error,
  onGoBack,
}: ProductDetailErrorProps) {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Error al cargar el producto</h2>
          {error && <p className="text-muted-foreground">{error}</p>}
          <Button onClick={onGoBack} variant="outline">
            Volver a productos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
