
"use client";

import { useState } from "react";
import { SidebarNav } from "../components/sidebar-nav";
import { Header } from "../components/header";
import { CategoryFilter } from "../components/category-filter";
import { FoodGrid } from "../components/food-grid";
// import { Cart } from "../components/cart"; // Remove old cart
import { Footer } from "../components/footer";

export default function POSPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav isCollapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          isSidebarCollapsed={isSidebarCollapsed} 
        />
        <main className="flex-1 overflow-y-auto p-4 print:overflow-visible">
          <CategoryFilter />
          <FoodGrid />
        </main>
        {/* <Cart /> */} {/* Removed old cart component */}
        <Footer />
      </div>
    </div>
  );
}
