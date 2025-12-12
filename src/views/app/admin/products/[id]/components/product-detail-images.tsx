"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";

interface ProductDetailImagesProps {
  imageUrls: string[];
  productTitle: string;
}

export function ProductDetailImages({
  imageUrls,
  productTitle,
}: ProductDetailImagesProps) {
  if (imageUrls.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Imágenes del Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-muted rounded-md">
            <p className="text-muted-foreground">No hay imágenes disponibles</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {imageUrls.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square w-full">
                  <Image
                    src={imageUrl}
                    alt={`${productTitle} - Imagen ${index + 1}`}
                    fill
                    className="object-contain rounded-md"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {imageUrls.length > 1 && (
            <>
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            </>
          )}
        </Carousel>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {imageUrls.length} {imageUrls.length === 1 ? "imagen" : "imágenes"}
        </p>
      </CardContent>
    </Card>
  );
}
