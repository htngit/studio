"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { NavItem } from '@/lib/types';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  Receipt,
  Banknote,
  LineChart,
  Store,
  PanelLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';


const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'POS', href: '/pos', icon: ShoppingCart },
  {
    title: 'Manajemen Data',
    href: '/products', 
    icon: Package,
    subItems: [
      { title: 'Produk', href: '/products', icon: Package },
      { title: 'Kategori', href: '/categories', icon: Tags },
    ],
  },
  { title: 'Transaksi', href: '/transactions', icon: Receipt },
  { title: 'Pengeluaran', href: '/expenses', icon: Banknote },
  { title: 'Laporan', href: '/reports', icon: LineChart },
];

function SidebarNavigation() {
  const pathname = usePathname();
  const { open, isMobile, state } = useSidebar();
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    const activeParent = navItems.find(item => item.subItems?.some(sub => pathname.startsWith(sub.href)));
    if (activeParent) {
      setActiveAccordionItem(activeParent.title);
    } else {
      const isActiveTopLevel = navItems.some(item => !item.subItems && pathname.startsWith(item.href));
      if (isActiveTopLevel || !activeParent) {
        setActiveAccordionItem(undefined);
      }
    }
  }, [pathname]);


  return (
    <SidebarMenu>
      {navItems.map((item) =>
        item.subItems ? (
          <Accordion
            type="single"
            collapsible
            key={item.title}
            value={activeAccordionItem}
            onValueChange={setActiveAccordionItem}
            className="w-full"
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  "flex w-full items-center overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground",
                  "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center",
                  (item.subItems?.some(sub => pathname.startsWith(sub.href)) || (pathname.startsWith(item.href) && item.href !== '/')) && activeAccordionItem === item.title && 
                  "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                )}
              >
                 <div className={cn("flex items-center gap-2 flex-grow min-w-0", {"justify-center": state === "collapsed" && !isMobile})}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  { (open || (isMobile && state === "expanded")) && <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>}
                 </div>
              </AccordionTrigger>
              <AccordionContent className={cn("pl-4 group-data-[collapsible=icon]:hidden")}>
                <SidebarMenu className="pt-1">
                  {item.subItems.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === subItem.href || (subItem.href !== '/' && pathname.startsWith(subItem.href))}
                            className="justify-start text-sm"
                          >
                            <Link href={subItem.href}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {(state === 'collapsed' && !isMobile && subItem.title) && (
                          <TooltipContent side="right" align="center">
                            {subItem.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <SidebarMenuItem key={item.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && !item.subItems)}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(open || (isMobile && state === 'expanded')) && (
                      <span className="truncate group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {(state === 'collapsed' && !isMobile && item.title) && (
                <TooltipContent side="right" align="center">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [initialSidebarOpen, setInitialSidebarOpen] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('sidebar_state='))
        ?.split('=')[1];
      if (cookieValue) {
        setInitialSidebarOpen(cookieValue === 'true');
      }
    }
  }, []);


  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={initialSidebarOpen} open={initialSidebarOpen} onOpenChange={setInitialSidebarOpen}>
        <Sidebar collapsible="icon" variant="sidebar" side="left">
          <SidebarHeader className="p-4 flex items-center gap-2 justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Store className="h-8 w-8 text-sidebar-primary" />
              <h1 className="text-xl font-headline font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">Toko Mudah</h1>
            </Link>
          </SidebarHeader>
          <ScrollArea className="flex-1 group-data-[collapsible=icon]:overflow-hidden">
            <SidebarContent className="p-2">
              <SidebarNavigation />
            </SidebarContent>
          </ScrollArea>
          <div className="p-4 border-t border-sidebar-border group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                      <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                      <span className="text-sm font-medium text-sidebar-foreground">Admin Toko</span>
                      <span className="text-xs text-sidebar-foreground/70">admin@tokomudah.com</span>
                  </div>
              </div>
          </div>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
              <div className="flex items-center gap-2">
                   <SidebarTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <span className="flex items-center justify-center">
                          <PanelLeft className="h-5 w-5" />
                          <span className="sr-only">Toggle navigation menu</span>
                        </span>
                      </Button>
                   </SidebarTrigger>
              </div>
              <div className="flex-1">
                  {/* Future: Breadcrumbs or page title can go here */}
              </div>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="flex items-center justify-center">
                      <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                      <AvatarFallback>TM</AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Toggle user menu</span>
                    </span>
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <ScrollArea className="h-[calc(100vh-theme(spacing.14)-theme(spacing.16))]">
               {children}
            </ScrollArea>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}