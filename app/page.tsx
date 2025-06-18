"use client";

import { useState } from "react";
import { SidebarNav } from "../components/sidebar-nav";
import { Header } from "../components/header";
import { CategoryFilter } from "../components/category-filter";
import { FoodGrid } from "../components/food-grid";
import { Cart } from "../components/cart";
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
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-auto p-4">
            <CategoryFilter />
            <FoodGrid />
          </main>
          <Cart />
        </div>
        <Footer />
      </div>
    </div>
  );
}
