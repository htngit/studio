import ProductForm from '@/components/products/product-form';
import { placeholderCategories } from '@/lib/placeholder-data'; // Ensure this path is correct
import type { Category } from '@/lib/types';

// This is a server component, but ProductForm is a client component.
// We can fetch server-side data here if needed and pass to ProductForm.
// For now, using placeholder data.

// Simulate a server action for adding a product
async function addProductAction(data: any) {
  "use server"; // If you were using actual server actions
  console.log("Adding product (server action simulation):", data);
  // In a real app, you'd save to DB here.
  // For now, we simulate a delay.
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate success or error
  // if (Math.random() > 0.8) throw new Error("Simulated server error");
}


export default async function NewProductPage() {
  // Fetch categories from a database in a real application
  const categories: Category[] = placeholderCategories;

  return (
    <div className="container mx-auto py-8">
      <ProductForm categories={categories} onSubmitForm={addProductAction}/>
    </div>
  );
}
