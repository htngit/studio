import { Search, Share2, PanelLeftClose, PanelRightClose } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function Header({ toggleSidebar, isSidebarCollapsed }: HeaderProps) {
  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:mr-4">
        {isSidebarCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input type="text" placeholder="Search Product here..." className="pl-10 w-full" />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Table 4</span>
        <span className="text-gray-500 text-sm">Floyd Miles</span>
      </div>
      <Button variant="ghost" size="icon">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
