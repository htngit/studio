"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { placeholderTransactions, placeholderExpenses } from "@/lib/placeholder-data";
import type { Transaction, Expense, FinancialReport } from "@/lib/types";
import { LineChart, DollarSign, TrendingUp, TrendingDown, CalendarIcon, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, subMonths, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as ChartTooltip, Legend as ChartLegend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const [report, setReport] = useState<FinancialReport | null>(null);

  const generateReport = () => {
    const { from, to } = dateRange;
    if (!from || !to || !isValid(from) || !isValid(to)) {
        // Handle invalid date range, perhaps show a toast
        console.error("Invalid date range selected");
        return;
    }

    const filteredTransactions = placeholderTransactions.filter(t => {
      const tDate = new Date(t.timestamp);
      return tDate >= from && tDate <= to;
    });

    const filteredExpenses = placeholderExpenses.filter(e => {
      const eDate = new Date(e.date);
      return eDate >= from && eDate <= to;
    });

    const totalIncome = filteredTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalIncome - totalExpenses;

    // Example for breakdown - can be more sophisticated
    const incomeByPaymentMethod = filteredTransactions.reduce((acc, t) => {
        acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + t.totalAmount;
        return acc;
    }, {} as Record<string, number>);
    
    const incomeBreakdown = Object.entries(incomeByPaymentMethod).map(([method, amount]) => ({ category: method, amount }));

    const expensesByCategory = filteredExpenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {} as Record<string, number>);
    const expenseBreakdown = Object.entries(expensesByCategory).map(([category, amount]) => ({ category, amount }));


    setReport({
      totalIncome,
      totalExpenses,
      netProfit,
      startDate: from,
      endDate: to,
      incomeBreakdown,
      expenseBreakdown,
    });
  };
  
  // Generate report on initial load and when dateRange changes
  useEffect(() => {
    generateReport();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);


  const chartData = useMemo(() => {
    if (!report) return [];
    return [
      { name: 'Pendapatan', value: report.totalIncome, fill: "hsl(var(--chart-2))" },
      { name: 'Pengeluaran', value: report.totalExpenses, fill: "hsl(var(--chart-1))" },
      { name: 'Keuntungan', value: report.netProfit, fill: "hsl(var(--chart-4))" },
    ];
  }, [report]);

  const chartConfig = {
    value: {
      label: "Jumlah (IDR)",
    },
    Pendapatan: {
      label: "Pendapatan",
      color: "hsl(var(--chart-2))",
    },
    Pengeluaran: {
      label: "Pengeluaran",
      color: "hsl(var(--chart-1))",
    },
    Keuntungan: {
      label: "Keuntungan",
      color: "hsl(var(--chart-4))",
    },
  } satisfies import("@/components/ui/chart").ChartConfig;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Laporan Keuangan</h1>
          <p className="text-muted-foreground">Analisis performa keuangan toko Anda.</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant={"outline"} className="w-[280px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y", { locale: localeID })} - {format(dateRange.to, "LLL dd, y", { locale: localeID })}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y", { locale: localeID })
                  )
                ) : (
                  <span>Pilih rentang tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={localeID}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={generateReport} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Filter className="mr-2 h-4 w-4"/> Terapkan Filter
          </Button>
        </div>
      </div>

      {!report ? (
         <div className="text-center py-12">
            <LineChart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Pilih Rentang Tanggal</h3>
            <p className="text-muted-foreground">Pilih rentang tanggal untuk melihat laporan.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                <DollarSign className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{formatCurrency(report.totalIncome)}</div>
                <p className="text-xs text-muted-foreground">Dari semua transaksi pada periode ini.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                <TrendingDown className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{formatCurrency(report.totalExpenses)}</div>
                <p className="text-xs text-muted-foreground">Semua biaya operasional tercatat.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Keuntungan Bersih</CardTitle>
                <TrendingUp className={`h-5 w-5 ${report.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${report.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(report.netProfit)}</div>
                <p className="text-xs text-muted-foreground">Pendapatan dikurangi pengeluaran.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Ringkasan Visual</CardTitle>
              <CardDescription>
                Periode: {format(report.startDate, "dd MMM yyyy", { locale: localeID })} - {format(report.endDate, "dd MMM yyyy", { locale: localeID })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
               {chartData.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickFormatter={(value) => formatCurrency(value).replace('IDR', '').trim()} />
                    <ChartTooltip 
                        cursor={false} 
                        content={<ChartTooltipContent 
                            formatter={(value) => formatCurrency(Number(value))} 
                            indicator="dot" 
                        />} 
                    />
                    <Bar dataKey="value" radius={8} />
                    </BarChart>
                </ChartContainer>
               ) : (
                <p className="text-muted-foreground text-center py-8">Tidak ada data untuk ditampilkan pada grafik.</p>
               )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Rincian Pendapatan</CardTitle>
                    <CardDescription>Berdasarkan metode pembayaran.</CardDescription>
                </CardHeader>
                <CardContent>
                    {report.incomeBreakdown && report.incomeBreakdown.length > 0 ? (
                        <ul className="space-y-2">
                            {report.incomeBreakdown.map(item => (
                                <li key={item.category} className="flex justify-between items-center p-2 bg-secondary/30 rounded-md">
                                    <span className="text-sm font-medium">{item.category}</span>
                                    <span className="text-sm font-semibold text-green-600">{formatCurrency(item.amount)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-sm">Tidak ada rincian pendapatan.</p>
                    )}
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Rincian Pengeluaran</CardTitle>
                    <CardDescription>Berdasarkan kategori pengeluaran.</CardDescription>
                </CardHeader>
                <CardContent>
                    {report.expenseBreakdown && report.expenseBreakdown.length > 0 ? (
                        <ul className="space-y-2">
                            {report.expenseBreakdown.map(item => (
                                <li key={item.category} className="flex justify-between items-center p-2 bg-secondary/30 rounded-md">
                                    <span className="text-sm font-medium">{item.category}</span>
                                    <span className="text-sm font-semibold text-red-600">{formatCurrency(item.amount)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-sm">Tidak ada rincian pengeluaran.</p>
                    )}
                </CardContent>
            </Card>
          </div>

        </>
      )}
    </div>
  );
}
