"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui";
import { thousandSeparatorPipe } from "@/lib";
import { ProductDetailForAdminResponse } from "@/models/responses";

interface ProductDetailCardProps {
  productDetail: ProductDetailForAdminResponse;
  discountedPrice: string;
}

export function ProductDetailCard({
  productDetail,
  discountedPrice,
}: ProductDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-1/3">Descripción</TableCell>
              <TableCell>{productDetail.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Precio Original</TableCell>
              <TableCell>{productDetail.price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Descuento</TableCell>
              <TableCell>{productDetail.discount}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Precio Final</TableCell>
              <TableCell className="text-lg font-semibold text-green-600">
                ${thousandSeparatorPipe(parseFloat(discountedPrice))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Stock</TableCell>
              <TableCell>
                <span className="font-semibold">{productDetail.stock}</span>{" "}
                unidades
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Categoría</TableCell>
              <TableCell>{productDetail.categoryName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Marca</TableCell>
              <TableCell>{productDetail.brandName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Estado</TableCell>
              <TableCell>{productDetail.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
