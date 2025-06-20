
"use client";

import { useState, type ReactNode } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav isCollapsed={isSidebarCollapsed} />
      <div className={cn("flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out")}>
        <Header 
          toggleSidebar={toggleSidebar} 
          isSidebarCollapsed={isSidebarCollapsed} 
        />
        <main className="flex-1 overflow-y-auto p-4 print:overflow-visible">
          {children}
        </main>
      </div>
    </div>
  );
}
