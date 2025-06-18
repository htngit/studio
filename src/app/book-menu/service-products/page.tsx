
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConciergeBell, PlusCircle } from "lucide-react";

export default function ServiceProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <ConciergeBell className="mr-3 h-7 w-7 text-primary" />
            Produk Layanan
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola layanan yang ditawarkan toko Anda (misal: jasa bungkus kado, ongkos kirim).
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5"/> Tambah Produk Layanan
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Pengelolaan Produk Layanan</CardTitle>
          <CardDescription>
            Fitur ini sedang dalam pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Di sini Anda akan dapat menambahkan layanan dengan harga tertentu, yang bisa ditambahkan ke transaksi di POS.
            Layanan ini akan tercatat sebagai pendapatan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
