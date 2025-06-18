
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LibraryBig } from "lucide-react";

export default function GeneralLedgerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <LibraryBig className="mr-3 h-7 w-7 text-primary" />
            Buku Besar
          </h1>
          <p className="text-muted-foreground mt-1">
            Menampilkan rincian transaksi untuk setiap akun perkiraan. 
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Detail Akun</CardTitle>
            <CardDescription>
                Data untuk Buku Besar ditarik dari Jurnal Umum dan dikelompokkan per akun.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Fitur Buku Besar sedang dalam pengembangan. Di sini Anda akan dapat memilih akun dari Bagan Akun Perkiraan (Chart of Accounts) dan melihat semua transaksi yang mempengaruhi akun tersebut, lengkap dengan saldo berjalan.
          </p>
           <div className="mt-4 p-4 border rounded-lg bg-secondary/30">
            <h3 className="font-semibold text-lg mb-2">Contoh Cara Kerja:</h3>
            <p className="text-sm">
                Misalnya, jika Anda memilih akun "Kas", Buku Besar akan menampilkan semua penerimaan kas (dari penjualan tunai) dan pengeluaran kas (untuk biaya atau pembelian tunai), serta saldo kas akhir.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
