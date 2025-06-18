import { Menu, TableIcon as TableBar, CalendarRange, Truck, Calculator, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Menu, label: "Menu", color: "text-green-600" },
  { icon: TableBar, label: "Table Services", color: "text-gray-600" },
  { icon: CalendarRange, label: "Reservation", color: "text-gray-600" },
  { icon: Truck, label: "Delivery", color: "text-gray-600" },
  { icon: Calculator, label: "Accounting", color: "text-gray-600" },
  { icon: Settings, label: "Settings", color: "text-gray-600" },
];

interface SidebarNavProps {
  isCollapsed: boolean;
}

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
  return (
    <div
      className={cn(
        "p-4 border-r h-screen flex flex-col bg-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("flex items-center gap-2 mb-8", isCollapsed ? "justify-center" : "")}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg"
          alt="Chili POS Logo"
          className="w-8 h-8"
        />
        {!isCollapsed && <span className="font-semibold">CHILI POS</span>}
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full",
              item.color,
              isCollapsed ? "justify-center px-0" : "justify-start" 
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>
      <Button
        variant="ghost"
        className={cn(
            "w-full text-gray-600 mt-auto",
            isCollapsed ? "justify-center px-0" : "justify-start"
        )}
        title={isCollapsed ? "Logout" : undefined}
      >
        <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
        {!isCollapsed && "Logout"}
      </Button>
    </div>
  );
}
