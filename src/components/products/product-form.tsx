"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Product, Category } from '@/lib/types';
import { placeholderCategories } from '@/lib/placeholder-data'; // Assuming you have this
import { useToast } from "@/hooks/use-toast";
import { Save, X } from 'lucide-react';

const productFormSchema = z.object({
  name: z.string().min(3, { message: "Nama produk minimal 3 karakter." }).max(100),
  price: z.coerce.number().min(0, { message: "Harga harus positif." }),
  stock: z.coerce.number().int().min(0, { message: "Stok harus bilangan bulat positif." }),
  categoryId: z.string().min(1, { message: "Kategori harus dipilih." }),
  barcode: z.string().optional(),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }).optional().or(z.literal('')),
  description: z.string().max(500, { message: "Deskripsi maksimal 500 karakter." }).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  categories?: Category[]; // Optional: pass categories or fetch inside
  onSubmitForm: (data: ProductFormValues) => Promise<void>; // Simulate server action
}

export default function ProductForm({ initialData, categories = placeholderCategories, onSubmitForm }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      imageUrl: initialData.imageUrl || '',
      description: initialData.description || '',
    } : {
      name: '',
      price: 0,
      stock: 0,
      categoryId: '',
      barcode: '',
      imageUrl: '',
      description: '',
    },
  });

  const {formState: {isSubmitting}} = form;

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await onSubmitForm(data);
      toast({
        title: `Produk ${initialData ? 'Diperbarui' : 'Ditambahkan'}`,
        description: `Produk "${data.name}" telah berhasil ${initialData ? 'diperbarui' : 'disimpan'}.`,
      });
      router.push('/products'); // Redirect after successful submission
      router.refresh(); // To update product list if using server components
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan produk. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              {initialData ? 'Edit Produk' : 'Tambah Produk Baru'}
            </CardTitle>
            <CardDescription>
              Lengkapi detail produk di bawah ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Air Mineral Botol 600ml" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (IDR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori produk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode (Opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="899000000001" {...field} />
                  </FormControl>
                  <FormDescription>Masukkan kode barcode jika ada.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar Produk (Opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/300x200.png" {...field} />
                  </FormControl>
                  <FormDescription>Gunakan URL gambar dari internet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi (Opsional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi singkat mengenai produk..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              <X className="mr-2 h-4 w-4" /> Batal
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
