
"use client";

import { CategoryFilter } from "@/components/category-filter";
import { FoodGrid } from "@/components/food-grid";

export default function POSPage() {
  return (
    <>
      <CategoryFilter />
      <FoodGrid />
    </>
  );
}
