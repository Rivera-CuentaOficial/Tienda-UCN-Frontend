"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Percent } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";

const discountSchema = z.object({
  discount: z
    .number()
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor a 100%"),
});

type DiscountFormValues = z.infer<typeof discountSchema>;

interface ProductDiscountDialogProps {
  currentDiscount: number;
  onConfirm: (discount: number) => void;
  isUpdating?: boolean;
}

export function ProductDiscountDialog({
  currentDiscount,
  onConfirm,
  isUpdating = false,
}: ProductDiscountDialogProps) {
  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discount: currentDiscount,
    },
  });

  useEffect(() => {
    form.reset({ discount: currentDiscount });
  }, [currentDiscount, form]);

  const onSubmit = (values: DiscountFormValues) => {
    onConfirm(values.discount);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer flex-1">
          <Percent className="h-4 w-4 mr-2" />
          Cambiar Descuento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Descuento</DialogTitle>
          <DialogDescription>
            Ingresa el nuevo porcentaje de descuento para este producto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descuento (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      max="100"
                      {...field}
                      value={field.value ?? ""}
                      onChange={e => {
                        const value =
                          e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                      }}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Actualizando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
