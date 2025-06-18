
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, DollarSign, Landmark, TrendingUp, TrendingDown } from "lucide-react";

// Helper function to format currency (simplified)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function AccountingOverviewPage() {
  // Placeholder data - in a real app, this would be calculated
  const placeholderAssets = 50000000;
  const placeholderLiabilities = 15000000;
  const placeholderEquity = placeholderAssets - placeholderLiabilities;
  const placeholderNetProfit = 5000000; // Example net profit

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <PieChart className="mr-3 h-7 w-7 text-primary" />
            Ringkasan Akuntansi
          </h1>
          <p className="text-muted-foreground mt-1">
            Gambaran umum kondisi keuangan toko Anda. Data akan ditarik dari modul Transaksi, Pengeluaran, dan Produk.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Aset</CardTitle>
            <Landmark className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{formatCurrency(placeholderAssets)}</div>
            <p className="text-xs text-muted-foreground">Kas, Piutang, Persediaan, dll.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilitas</CardTitle>
            <TrendingDown className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{formatCurrency(placeholderLiabilities)}</div>
            <p className="text-xs text-muted-foreground">Hutang Usaha, Hutang Pajak, dll.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ekuitas</CardTitle>
            <DollarSign className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{formatCurrency(placeholderEquity)}</div>
            <p className="text-xs text-muted-foreground">Modal, Laba Ditahan, dll.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laba/Rugi (Periode Ini)</CardTitle>
            <TrendingUp className={`h-5 w-5 ${placeholderNetProfit >=0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${placeholderNetProfit >=0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(placeholderNetProfit)}</div>
            <p className="text-xs text-muted-foreground">Pendapatan dikurangi biaya.</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Integrasi Data</CardTitle>
            <CardDescription>
                Fitur akuntansi ini dirancang untuk terintegrasi penuh dengan modul lain:
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm"><strong className="text-primary">Transaksi Penjualan:</strong> Akan secara otomatis menghasilkan jurnal pendapatan dan mempengaruhi kas/piutang.</p>
            <p className="text-sm"><strong className="text-primary">Pengeluaran:</strong> Setiap pencatatan biaya akan otomatis dijurnal ke akun biaya yang sesuai.</p>
            <p className="text-sm"><strong className="text-primary">Manajemen Produk & Stok:</strong> Perubahan nilai persediaan akan tercermin dalam neraca. Pembelian stok akan dicatat sebagai penambahan aset persediaan dan pengurangan kas atau penambahan hutang.</p>
             <p className="text-sm"><strong className="text-primary">Pajak:</strong> Perhitungan pajak dari transaksi penjualan dan laba akan diotomatisasi dan dicatat ke akun pajak terkait.</p>
        </CardContent>
      </Card>

    </div>
  );
}
