import { Check, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui";
import { thousandSeparatorPipe } from "@/lib/utils";
import { ProductForCustomerResponse } from "@/models/responses";

import { useProductsCart } from "../hooks";

interface ProductCardProps {
  product: ProductForCustomerResponse;
  discountedPrice: (price: string, discount: number) => string;
  onClick?: () => void;
  isPriority?: boolean;
}

export const ProductCard = ({
  product,
  discountedPrice,
  onClick,
  isPriority,
}: ProductCardProps) => {
  const {
    isAdding,
    justAdded,
    actions: { handleAddToCart },
  } = useProductsCart({
    productId: product.id,
    productTitle: product.title,
  });

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
        <Image
          src={product.mainImageURL}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={isPriority}
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="mt-2 text-blue-700 font-bold text-xl">
          $
          {thousandSeparatorPipe(
            parseFloat(discountedPrice(product.price, product.discount))
          )}
        </p>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
          -{product.discount}%
        </span>
        <Button
          className="mt-4 w-full cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isAdding || justAdded}
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Agregando...
            </>
          ) : justAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              ¡Agregado!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar al Carrito
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
