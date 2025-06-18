"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { placeholderProducts } from "@/lib/placeholder-data";
import type { Product } from "@/lib/types";
import { PlusCircle, Edit, Trash2, MoreHorizontal, Search, Package, Tag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(placeholderProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm)) ||
      (product.categoryName && product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  const handleDelete = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast({
      title: "Produk Dihapus",
      description: "Produk telah berhasil dihapus dari daftar.",
    });
    setItemToDelete(null);
  };

  const ProductCardItem: React.FC<{ product: Product }> = ({ product }) => (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={product.imageUrl || "https://placehold.co/300x200.png"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint="product item"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{product.categoryName || 'Tanpa Kategori'}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-2">
        <p className="text-xl font-bold text-primary">{formatCurrency(product.price)}</p>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Stok:</span>
          <Badge variant={product.stock > 10 ? "secondary" : product.stock > 0 ? "outline" : "destructive"} className="font-semibold">
            {product.stock}
          </Badge>
        </div>
        {product.barcode && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Barcode:</span>
            <span className="font-mono text-xs">{product.barcode}</span>
          </div>
        )}
      </CardContent>
      <CardContent className="p-4 border-t flex gap-2">
        <Link href={`/products/${product.id}/edit`} passHref className="flex-1">
          <Button variant="outline" className="w-full">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </Link>
        <Button variant="destructive" onClick={() => setItemToDelete(product)} className="flex-1">
          <Trash2 className="mr-2 h-4 w-4" /> Hapus
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Manajemen Produk</h1>
          <p className="text-muted-foreground">Kelola daftar produk Anda di sini.</p>
        </div>
        <Link href="/products/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
            <PlusCircle className="mr-2 h-5 w-5" /> Tambah Produk Baru
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk (nama, barcode, kategori)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-1">
              <Button variant={viewMode === 'grid' ? 'secondary' : 'outline'} onClick={() => setViewMode('grid')}>Grid</Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'outline'} onClick={() => setViewMode('list')}>List</Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">Belum Ada Produk</h3>
          <p className="text-muted-foreground">Mulai tambahkan produk baru untuk toko Anda.</p>
          <Link href="/products/new" className="mt-4 inline-block">
             <Button variant="default">
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Produk
             </Button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Gambar</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead className="text-center">Stok</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Image
                      src={product.imageUrl || "https://placehold.co/64x64.png"}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded aspect-square object-cover"
                      data-ai-hint="product thumbnail"
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate max-w-xs" title={product.name}>{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <Badge variant="outline">{product.categoryName || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                  <TableCell className="text-center">
                     <Badge variant={product.stock > 10 ? "secondary" : product.stock > 0 ? "outline" : "destructive"}>
                        {product.stock}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{product.barcode || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <Link href={`/products/${product.id}/edit`} passHref>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => setItemToDelete(product)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {itemToDelete && (
        <AlertDialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menghapus produk <strong className="font-semibold">{itemToDelete.name}</strong> secara permanen. Data yang dihapus tidak dapat dikembalikan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(itemToDelete.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Ya, Hapus Produk
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
