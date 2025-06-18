
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function IncomeStatementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <FileText className="mr-3 h-7 w-7 text-primary" />
            Laporan Laba Rugi
          </h1>
          <p className="text-muted-foreground mt-1">
            Menunjukkan kinerja keuangan toko Anda selama periode tertentu.
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Performa Keuangan</CardTitle>
            <CardDescription>
                Laporan ini akan menghitung pendapatan dari modul Transaksi dan biaya dari modul Pengeluaran secara otomatis.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Fitur Laporan Laba Rugi sedang dalam pengembangan. Ini akan menampilkan:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm mt-2 text-muted-foreground">
            <li>Pendapatan Penjualan (dari total transaksi di POS)</li>
            <li>Harga Pokok Penjualan (terkait dengan produk yang terjual)</li>
            <li>Laba Kotor</li>
            <li>Biaya Operasional (dari modul Pengeluaran)</li>
            <li>Laba Bersih Sebelum Pajak</li>
            <li>Pajak Penghasilan</li>
            <li>Laba Bersih Setelah Pajak</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Anda akan dapat memilih periode laporan (misalnya, bulanan, tahunan) untuk analisis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
