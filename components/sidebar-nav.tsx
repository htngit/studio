
import { Menu, TableIcon as TableBar, CalendarRange, Truck, Calculator, Settings, LogOut, PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Menu, label: "Menu", color: "text-primary", href: "/" },
  { icon: TableBar, label: "Table Services", color: "text-muted-foreground", href: "/tables" },
  { icon: CalendarRange, label: "Reservation", color: "text-muted-foreground", href: "/reservations" },
  { icon: Truck, label: "Delivery", color: "text-muted-foreground", href: "/delivery" },
  { icon: Calculator, label: "Accounting", color: "text-muted-foreground", href: "/accounting" },
  { icon: Settings, label: "Settings", color: "text-muted-foreground", href: "/settings" },
];

interface SidebarNavProps {
  isCollapsed: boolean;
}

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
  return (
    <div
      className={cn(
        "p-4 border-r h-screen flex flex-col bg-card transition-all duration-300 ease-in-out print:hidden",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("flex items-center gap-2 mb-8 h-10", isCollapsed ? "justify-center" : "px-2")}>
        <img
          src="https://placehold.co/32x32.png" // Placeholder, replace with actual logo
          alt="Chili POS Logo"
          className="w-8 h-8"
          data-ai-hint="logo brand"
        />
        {!isCollapsed && <span className="font-semibold text-lg text-foreground">CHILI POS</span>}
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full font-medium",
              item.href === "/" ? item.color : "text-muted-foreground hover:text-foreground", // Example active state logic
              isCollapsed ? "justify-center px-0" : "justify-start"
            )}
            title={isCollapsed ? item.label : undefined}
            asChild
          >
            <a href={item.href}>
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.label}
            </a>
          </Button>
        ))}
      </nav>
      <Button
        variant="ghost"
        className={cn(
            "w-full text-muted-foreground hover:text-foreground mt-auto font-medium",
            isCollapsed ? "justify-center px-0" : "justify-start"
        )}
        title={isCollapsed ? "Logout" : undefined}
      >
        <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
        {!isCollapsed && "Logout"}
      </Button>
    </div>
  );
}
