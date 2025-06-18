
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MenuSquare } from "lucide-react";

export default function BookMenuOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-headline font-semibold flex items-center">
        <MenuSquare className="mr-3 h-7 w-7 text-primary" />
        Buku Menu
      </h1>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Ringkasan Buku Menu</CardTitle>
          <CardDescription>
            Pusat pengelolaan untuk semua item yang ditawarkan di toko Anda, termasuk produk, layanan, item ekstra, dan paket.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Dari sini, Anda dapat mengelola:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm mt-2 text-muted-foreground">
            <li><strong>Daftar Departemen:</strong> Kelompokkan item menu berdasarkan departemen (misal: Dapur, Bar, Kasir).</li>
            <li><strong>Daftar Kategori:</strong> Kategorikan produk dan layanan Anda agar mudah dicari.</li>
            <li><strong>Daftar Produk:</strong> Kelola semua produk fisik yang Anda jual.</li>
            <li><strong>Produk Layanan:</strong> Tambahkan dan kelola layanan yang ditawarkan (misal: jasa bungkus kado, ongkos kirim).</li>
            <li><strong>Produk Ekstra:</strong> Definisikan item tambahan yang dapat dipilih pelanggan (misal: topping, saus tambahan).</li>
            <li><strong>Produk Paket:</strong> Buat bundel produk atau layanan dengan harga khusus.</li>
          </ul>
           <p className="text-sm text-muted-foreground mt-4">
            Halaman ini adalah ringkasan. Silakan pilih sub-menu di sidebar untuk detail pengelolaan masing-masing bagian.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
