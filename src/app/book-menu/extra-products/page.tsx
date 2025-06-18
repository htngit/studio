
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusSquare, PlusCircle } from "lucide-react";

export default function ExtraProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <PlusSquare className="mr-3 h-7 w-7 text-primary" />
            Produk Ekstra
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola item tambahan atau pilihan yang dapat ditambahkan ke produk utama (misal: topping, saus).
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5"/> Tambah Produk Ekstra
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Pengelolaan Produk Ekstra</CardTitle>
          <CardDescription>
            Fitur ini sedang dalam pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Anda akan dapat mendefinisikan produk ekstra yang bisa dipilih pelanggan saat memesan produk tertentu.
            Produk ekstra dapat memiliki harga tambahan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
