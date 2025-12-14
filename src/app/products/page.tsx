import { Suspense } from "react";

import { ProductsView } from "@/views";

export const metadata = {
  title: "Productos - Tienda UCN",
  description: "Explora nuestra amplia gama de productos en la Tienda UCN.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <ProductsView />
    </Suspense>
  );
}
