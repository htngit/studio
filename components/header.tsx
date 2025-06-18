
import { Search, Share2, PanelLeftClose, PanelRightClose, ShoppingCart, Banknote, CreditCard, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Corrected path
import { CartDialogContent } from "./cart-dialog-content";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

// Temporary static data for cart item count badge in header
// In a real app, this would come from a shared state
const cartItemCount = 4; 

export function Header({ toggleSidebar, isSidebarCollapsed }: HeaderProps) {
  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b print:hidden">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:mr-4">
        {isSidebarCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input type="text" placeholder="Search Product here..." className="pl-10 w-full" />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold hidden sm:inline">Table 4</span>
        <span className="text-gray-500 text-sm hidden md:inline">Floyd Miles</span>
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Buka Keranjang</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] flex flex-col max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Keranjang Belanja</DialogTitle>
            <DialogDescription>
              Rincian pesanan Anda. Klik bayar jika sudah sesuai.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto px-6 pt-4"> 
            <CartDialogContent />
          </div>
          <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 p-6 pt-4 border-t">
            <div className="grid grid-cols-3 gap-2 w-full">
              <Button variant="outline" className="flex flex-col items-center py-2 h-auto">
                <Banknote className="h-5 w-5 mb-1" />
                <span className="text-xs">Cash</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center py-2 h-auto">
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Credit/Debit Card</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center py-2 h-auto">
                <QrCode className="h-5 w-5 mb-1" />
                <span className="text-xs">QR Code</span>
              </Button>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="ghost" size="icon">
        <Share2 className="h-5 w-5" />
        <span className="sr-only">Bagikan</span>
      </Button>
    </div>
  );
}
