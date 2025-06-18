
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function BalanceSheetPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <Scale className="mr-3 h-7 w-7 text-primary" />
            Neraca
          </h1>
          <p className="text-muted-foreground mt-1">
            Menyajikan posisi keuangan toko pada tanggal tertentu.
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Posisi Keuangan</CardTitle>
            <CardDescription>
                Neraca akan secara otomatis mengkalkulasi Aset, Liabilitas, dan Ekuitas berdasarkan data transaksi, pengeluaran, dan produk.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Fitur Neraca sedang dalam pengembangan. Laporan ini akan menampilkan:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
                <h3 className="font-semibold text-lg mb-1 text-primary">Aset</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Kas & Bank (dari total pendapatan dikurangi pengeluaran)</li>
                    <li>Piutang Usaha (jika ada penjualan kredit)</li>
                    <li>Persediaan Barang (nilai stok produk dari modul Produk)</li>
                    <li>Aset Tetap (misal: peralatan toko, setelah dikurangi penyusutan)</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-1 text-primary">Liabilitas</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Hutang Usaha (misal: dari pembelian stok secara kredit)</li>
                    <li>Hutang Pajak (PPH, PPN)</li>
                    <li>Biaya yang Masih Harus Dibayar</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-1 text-primary">Ekuitas</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Modal Pemilik</li>
                    <li>Laba Ditahan (akumulasi laba bersih dari Laporan Laba Rugi)</li>
                </ul>
            </div>
          </div>
           <p className="text-sm text-muted-foreground mt-4 font-semibold">
            Prinsip dasar akuntansi: Total Aset = Total Liabilitas + Total Ekuitas akan selalu dijaga.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
