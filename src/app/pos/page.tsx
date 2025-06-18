"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { placeholderProducts, placeholderCategories } from "@/lib/placeholder-data";
import type { Product, CartItem, Category } from "@/lib/types";
import Image from 'next/image';
import { PlusCircle, MinusCircle, Trash2, Search, ShoppingCart, Percent, XCircle, CheckCircle, Info, Tag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper function to format currency (simplified)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};


interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="relative w-full h-40">
        <Image
          src={product.imageUrl || "https://placehold.co/300x200.png"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint="product item"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-md font-semibold truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{product.categoryName}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
        <p className="text-xs text-muted-foreground">Stok: {product.stock}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button 
          onClick={() => onAddToCart(product)} 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          disabled={product.stock === 0}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [taxRate, setTaxRate] = useState(0.11); // 11% default tax
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    return placeholderProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || (product.barcode && product.barcode.includes(searchTerm));
      const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          toast({
            title: "Stok Tidak Cukup",
            description: `Stok untuk ${product.name} hanya tersisa ${product.stock}.`,
            variant: "destructive",
          });
          return prevCart;
        }
      }
      if (product.stock > 0) {
        return [...prevCart, { ...product, quantity: 1 }];
      } else {
         toast({
            title: "Stok Habis",
            description: `${product.name} sudah habis.`,
            variant: "destructive",
          });
        return prevCart;
      }
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.id === productId);
      const originalProduct = placeholderProducts.find(p => p.id === productId);
      if (productInCart && originalProduct) {
        if (quantity > originalProduct.stock) {
           toast({
            title: "Stok Tidak Cukup",
            description: `Stok untuk ${originalProduct.name} hanya tersisa ${originalProduct.stock}.`,
            variant: "destructive",
          });
          return prevCart.map(item => item.id === productId ? { ...item, quantity: originalProduct.stock } : item);
        }
      }
      
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const taxAmount = useMemo(() => {
    return subtotal * taxRate;
  }, [subtotal, taxRate]);

  const discountAmount = useMemo(() => {
    if (discountType === 'percentage') {
      return subtotal * (discountValue / 100);
    }
    return discountValue > subtotal ? subtotal : discountValue;
  }, [subtotal, discountType, discountValue]);

  const totalAmount = useMemo(() => {
    return subtotal + taxAmount - discountAmount;
  }, [subtotal, taxAmount, discountAmount]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Tambahkan produk ke keranjang terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    setShowCheckoutModal(true);
  };

  const processPayment = () => {
    // Simulate payment processing & saving transaction
    console.log("Processing payment...", {
      cart, subtotal, taxAmount, discountAmount, totalAmount, paymentMethod
    });
    
    // Here you would typically call a server action to save the transaction
    // For now, we just show a success toast and clear the cart

    toast({
      title: "Transaksi Berhasil!",
      description: `Total pembayaran ${formatCurrency(totalAmount)} dengan ${paymentMethod}.`,
      action: <ToastAction altText="Lihat Struk">Lihat Struk</ToastAction>, // This would link to transaction detail page
    });
    
    setCart([]);
    setDiscountValue(0);
    setShowCheckoutModal(false);
  };

  const categories: Category[] = [{ id: 'all', name: 'Semua Kategori' }, ...placeholderCategories];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-theme(spacing.28))]">
      {/* Product Selection Area */}
      <div className="lg:w-3/5 flex flex-col gap-4">
        <Card className="shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-xl">Pilih Produk</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari produk atau scan barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>
        <ScrollArea className="flex-grow rounded-lg border bg-card shadow-inner p-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
              <Tag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">Produk Tidak Ditemukan</h3>
              <p className="text-muted-foreground">Coba kata kunci atau kategori lain.</p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Cart Area */}
      <div className="lg:w-2/5 flex flex-col">
        <Card className="flex-grow flex flex-col shadow-lg">
          <CardHeader className="p-4">
            <CardTitle className="text-xl flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6 text-primary" /> Keranjang Belanja
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-grow border-t border-b">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-10">
                 <Info className="w-16 h-16 text-muted-foreground mb-4" />
                 <h3 className="text-xl font-semibold">Keranjang Kosong</h3>
                 <p className="text-muted-foreground">Pilih produk untuk ditambahkan ke keranjang.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                    <TableHead className="text-center w-[50px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium truncate" title={item.name}>{item.name}</div>
                        <div className="text-xs text-muted-foreground">{formatCurrency(item.price)}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}><MinusCircle className="h-4 w-4" /></Button>
                          <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="h-8 w-12 text-center p-1" min="1" max={item.stock} />
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}><PlusCircle className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(item.price * item.quantity)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive/80" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label>Subtotal</Label>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="taxRate" className="flex-shrink-0">Pajak ({taxRate * 100}%)</Label>
              <Input id="taxRate" type="number" value={taxRate * 100} onChange={(e) => setTaxRate(parseFloat(e.target.value) / 100)} className="h-8 w-20 text-sm" step="0.1" min="0" />
              <span className="font-semibold ml-auto">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Label htmlFor="discountValue" className="flex-shrink-0 whitespace-nowrap">Diskon</Label>
                <div className="flex gap-1 w-full sm:w-auto">
                    <Input id="discountValue" type="number" value={discountValue} onChange={(e) => setDiscountValue(parseFloat(e.target.value))} className="h-8 flex-grow sm:w-20 text-sm" min="0" />
                    <Select value={discountType} onValueChange={(value: 'percentage' | 'fixed') => setDiscountType(value)}>
                        <SelectTrigger className="h-8 w-[60px] sm:w-auto text-xs p-1 sm:p-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="percentage">%</SelectItem>
                            <SelectItem value="fixed">IDR</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <span className="font-semibold ml-auto text-destructive">- {formatCurrency(discountAmount)}</span>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center w-full text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(totalAmount)}</span>
            </div>
            <Button onClick={handleCheckout} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105" disabled={cart.length === 0}>
              <CheckCircle className="mr-2 h-5 w-5" /> Bayar
            </Button>
            {cart.length > 0 && (
                 <AlertDialog>
                 <AlertDialogTrigger asChild>
                    <Button variant="outline" size="lg" className="w-full hover:border-destructive hover:text-destructive">
                        <XCircle className="mr-2 h-5 w-5" /> Batal Transaksi
                    </Button>
                 </AlertDialogTrigger>
                 <AlertDialogContent>
                     <AlertDialogHeader>
                         <AlertDialogTitle>Batalkan Transaksi?</AlertDialogTitle>
                         <AlertDialogDescription>
                             Apakah Anda yakin ingin menghapus semua item dari keranjang dan membatalkan transaksi ini?
                         </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                         <AlertDialogCancel>Tidak</AlertDialogCancel>
                         <AlertDialogAction
                             onClick={() => {
                                 setCart([]);
                                 setDiscountValue(0);
                                 toast({ title: "Transaksi Dibatalkan", description: "Keranjang belanja telah dikosongkan." });
                             }}
                             className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                         >
                             Ya, Batalkan
                         </AlertDialogAction>
                     </AlertDialogFooter>
                 </AlertDialogContent>
             </AlertDialog>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Checkout Modal */}
      <AlertDialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Total belanja Anda adalah <strong className="text-primary">{formatCurrency(totalAmount)}</strong>.
              Silakan pilih metode pembayaran.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Pilih metode pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Kartu Debit/Kredit</SelectItem>
                <SelectItem value="QRIS">QRIS</SelectItem>
                <SelectItem value="Transfer">Transfer Bank</SelectItem>
              </SelectContent>
            </Select>
            {/* Add more payment details form if needed, e.g., amount tendered for cash */}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={processPayment} className="bg-primary hover:bg-primary/90">
              Proses Pembayaran
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
