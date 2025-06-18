import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { placeholderTransactions, placeholderExpenses, placeholderProducts } from "@/lib/placeholder-data";
import { format } from 'date-fns';

// Helper function to format currency (simplified)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function DashboardPage() {
  const totalIncome = placeholderTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
  const totalExpenses = placeholderExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const totalProducts = placeholderProducts.length;
  const lowStockProducts = placeholderProducts.filter(p => p.stock < 10).length;

  const summaryCards = [
    { title: "Total Pendapatan", value: formatCurrency(totalIncome), icon: DollarSign, description: "Dari semua transaksi", color: "text-green-500" },
    { title: "Total Pengeluaran", value: formatCurrency(totalExpenses), icon: TrendingDown, description: "Biaya operasional", color: "text-red-500" },
    { title: "Keuntungan Bersih", value: formatCurrency(netProfit), icon: TrendingUp, description: "Pendapatan - Pengeluaran", color: netProfit >= 0 ? "text-green-500" : "text-red-500" },
    { title: "Jumlah Produk", value: totalProducts.toString(), icon: Package, description: "Total item yang dijual" },
    { title: "Stok Menipis", value: lowStockProducts.toString(), icon: ShoppingCart, description: "Produk dengan stok < 10" },
    { title: "Total Transaksi", value: placeholderTransactions.length.toString(), icon: Users, description: "Jumlah transaksi tercatat" },
  ];

  const recentTransactions = placeholderTransactions.slice(0, 5);
  const recentExpenses = placeholderExpenses.slice(0, 3);


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Dashboard Toko Mudah</h1>
          <p className="text-muted-foreground">Ringkasan aktivitas toko Anda.</p>
        </div>
        <Link href="/pos">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
            <ShoppingCart className="mr-2 h-5 w-5" /> Ke Halaman POS
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color || 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${card.color || ''}`}>{card.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>5 transaksi terakhir yang tercatat.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentTransactions.map(trx => (
                <li key={trx.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
                  <div>
                    <p className="font-medium">Transaksi #{trx.id.substring(0,6)}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(trx.timestamp), "dd MMM yyyy, HH:mm")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{formatCurrency(trx.totalAmount)}</p>
                    <Link href={`/transactions/${trx.id}`}>
                       <Button variant="link" size="sm" className="text-xs p-0 h-auto text-accent hover:text-accent/80">Lihat Detail</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
             {recentTransactions.length === 0 && <p className="text-muted-foreground text-center py-4">Belum ada transaksi.</p>}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Pengeluaran Terbaru</CardTitle>
            <CardDescription>3 pengeluaran terakhir yang dicatat.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentExpenses.map(exp => (
                <li key={exp.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
                  <div>
                    <p className="font-medium">{exp.description}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(exp.date), "dd MMM yyyy")} - {exp.category}</p>
                  </div>
                  <p className="font-semibold text-destructive">{formatCurrency(exp.amount)}</p>
                </li>
              ))}
            </ul>
            {recentExpenses.length === 0 && <p className="text-muted-foreground text-center py-4">Belum ada pengeluaran.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
