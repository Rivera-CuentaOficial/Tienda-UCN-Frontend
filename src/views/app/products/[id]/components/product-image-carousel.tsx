import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";

interface ProductImageCarouselProps {
  images: string[];
}

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Imágenes del Producto
      </h2>
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                aria-label={`Imagen ${index + 1} de ${images.length}`}
                tabIndex={index === 0 ? 0 : -1}
              >
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={`Imagen del producto ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                    style={{ aspectRatio: "auto" }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
};
