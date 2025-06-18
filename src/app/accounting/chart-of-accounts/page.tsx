
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListTree, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sampleAccounts = [
  { code: '1-1000', name: 'Kas', type: 'Aset Lancar' },
  { code: '1-1100', name: 'Bank', type: 'Aset Lancar' },
  { code: '1-1200', name: 'Piutang Usaha', type: 'Aset Lancar' },
  { code: '1-1300', name: 'Persediaan Barang Dagang', type: 'Aset Lancar' },
  { code: '1-2000', name: 'Peralatan Toko', type: 'Aset Tetap' },
  { code: '2-1000', name: 'Hutang Usaha', type: 'Liabilitas Jangka Pendek' },
  { code: '2-1100', name: 'Hutang Pajak', type: 'Liabilitas Jangka Pendek' },
  { code: '3-1000', name: 'Modal Pemilik', type: 'Ekuitas' },
  { code: '3-2000', name: 'Laba Ditahan', type: 'Ekuitas' },
  { code: '4-1000', name: 'Pendapatan Penjualan', type: 'Pendapatan' },
  { code: '5-1000', name: 'Harga Pokok Penjualan', type: 'Biaya' },
  { code: '6-1000', name: 'Biaya Gaji', type: 'Biaya Operasional' },
  { code: '6-2000', name: 'Biaya Sewa', type: 'Biaya Operasional' },
  { code: '6-3000', name: 'Biaya Listrik & Air', type: 'Biaya Operasional' },
];


export default function ChartOfAccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <ListTree className="mr-3 h-7 w-7 text-primary" />
            Bagan Akun Perkiraan
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola daftar akun yang digunakan untuk mencatat transaksi keuangan. Akun-akun ini akan menjadi dasar untuk penjurnalan dan pelaporan.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5"/> Tambah Akun Baru
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Daftar Akun</CardTitle>
            <CardDescription>Berikut adalah contoh daftar akun perkiraan yang umum digunakan.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Kode Akun</TableHead>
                        <TableHead>Nama Akun</TableHead>
                        <TableHead>Tipe Akun</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sampleAccounts.map((account) => (
                        <TableRow key={account.code}>
                            <TableCell className="font-mono">{account.code}</TableCell>
                            <TableCell className="font-medium">{account.name}</TableCell>
                            <TableCell className="text-muted-foreground">{account.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-4">
                Dalam implementasi penuh, Anda dapat menambah, mengedit, dan menghapus akun sesuai kebutuhan bisnis Anda.
                Setiap transaksi dari modul Penjualan (POS), Pengeluaran, dan lainnya akan dipetakan ke akun-akun ini secara otomatis.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
