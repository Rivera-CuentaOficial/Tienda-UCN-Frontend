import { Suspense } from "react";

import { AdminProductDetailView } from "@/views";

interface AdminProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Detalle del Producto",
  description: "Página de detalle del producto para administración",
};

export default async function AdminProductDetailPage({
  params,
}: AdminProductDetailPageProps) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AdminProductDetailView id={(await params).id} />
    </Suspense>
  );
}
