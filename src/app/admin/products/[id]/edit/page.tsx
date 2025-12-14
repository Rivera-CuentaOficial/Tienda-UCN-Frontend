import EditProductView from "@/views/app/admin/products/[id]/edit";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Editar Producto",
  description: "Página para editar un producto existente",
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  return <EditProductView id={(await params).id} />;
}
