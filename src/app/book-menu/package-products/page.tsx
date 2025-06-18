
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, PlusCircle } from "lucide-react";

export default function PackageProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <Archive className="mr-3 h-7 w-7 text-primary" />
            Produk Paket
          </h1>
          <p className="text-muted-foreground mt-1">
            Buat dan kelola bundel produk atau layanan dengan harga khusus.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5"/> Tambah Produk Paket
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Pengelolaan Produk Paket</CardTitle>
          <CardDescription>
            Fitur ini sedang dalam pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Di sini Anda dapat membuat paket yang terdiri dari beberapa produk atau layanan yang sudah ada,
            dan menawarkannya dengan harga spesial.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
