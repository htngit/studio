
"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, Banknote, Edit2 } from "lucide-react";

// Static data for now, copied from original cart.tsx
const cartItemsData = [
  { title: "Original Chess Meat Burger With Chips (Non Veg)", price: 23.99, quantity: 1, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg" },
  { title: "Fresh Orange Juice With Basil Seed No Sugar (Veg)", price: 12.99, quantity: 1, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg" },
  { title: "Meat Sushi Maki With Tuna, Ship And Other (Non Veg)", price: 9.99, quantity: 1, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg" },
  { title: "Tacos Salsa With Chickens Grilled", price: 14.99, quantity: 1, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg" },
];

export function CartDialogContent() {
  const subtotal = cartItemsData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <>
      {/* Table Info & Dine In/Take Away options */}
      <div className="p-4 border-b -mx-6 -mt-4 mb-4 bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-center mb-4 px-2">
          <div>
            <h3 className="text-lg font-semibold">Table 4</h3>
            <p className="text-sm text-muted-foreground">Floyd Miles</p>
          </div>
          <Button variant="ghost" size="icon">
            <Edit2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-2 px-2">
          <Button variant="secondary" className="flex-1 rounded-full">
            Dine in
          </Button>
          <Button variant="outline" className="flex-1 rounded-full">
            Take Away
          </Button>
          <Button variant="outline" className="flex-1 rounded-full">
            Delivery
          </Button>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4">
        {cartItemsData.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Keranjang Anda kosong.</p>
        ) : (
          cartItemsData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
                data-ai-hint="food item"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium leading-tight">{item.title}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">{item.quantity}X</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Calculation Summary - only show if items exist */}
      {cartItemsData.length > 0 && (
        <div className="border-t pt-4 mt-4 -mx-6 px-6 pb-0"> {/* Adjusted padding */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sub Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax 5%</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total Amount</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
