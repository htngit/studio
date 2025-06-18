import ProductForm from '@/components/products/product-form';
import { getProductById, placeholderCategories } from '@/lib/placeholder-data';
import type { Product, Category } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

// Simulate a server action for updating a product
async function updateProductAction(data: any) {
  "use server"; // If you were using actual server actions
  console.log("Updating product (server action simulation):", data);
  // In a real app, you'd save to DB here.
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// This is a server component
export default async function EditProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  
  // Fetch product data and categories. In a real app, this would be from a database.
  const product: Product | undefined = getProductById(productId);
  const categories: Category[] = placeholderCategories;

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-6 w-6" /> Produk Tidak Ditemukan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Produk dengan ID <span className="font-mono bg-muted px-1 rounded">{productId}</span> tidak dapat ditemukan. Silakan kembali ke daftar produk.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProductForm initialData={product} categories={categories} onSubmitForm={updateProductAction} />
    </div>
  );
}
