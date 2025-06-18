
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpenText } from "lucide-react";

export default function GeneralJournalPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <BookOpenText className="mr-3 h-7 w-7 text-primary" />
            Jurnal Umum
          </h1>
          <p className="text-muted-foreground mt-1">
            Mencatat semua transaksi keuangan secara kronologis. 
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Catatan Jurnal</CardTitle>
            <CardDescription>
                Entri jurnal akan dibuat secara otomatis dari modul Transaksi (POS) dan Pengeluaran.
                Anda juga dapat menambahkan entri jurnal manual untuk penyesuaian atau transaksi lain yang tidak tercakup modul tersebut.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Fitur Jurnal Umum sedang dalam pengembangan. Nantinya, Anda akan melihat daftar entri jurnal di sini, lengkap dengan tanggal, deskripsi, akun yang didebit, dan akun yang dikredit.
          </p>
          <div className="mt-4 p-4 border rounded-lg bg-secondary/30">
            <h3 className="font-semibold text-lg mb-2">Contoh Integrasi:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Transaksi Penjualan (POS):</strong> Otomatis menjurnal Kas/Piutang (Debit) dan Pendapatan Penjualan (Kredit). Jika ada HPP, juga akan menjurnal HPP (Debit) dan Persediaan (Kredit).</li>
                <li><strong>Pengeluaran:</strong> Otomatis menjurnal Akun Biaya terkait (Debit) dan Kas/Hutang (Kredit).</li>
                <li><strong>Pembelian Stok:</strong> Menjurnal Persediaan (Debit) dan Kas/Hutang Usaha (Kredit).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
