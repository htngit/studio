"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { placeholderTransactions } from "@/lib/placeholder-data";
import type { Transaction } from "@/lib/types";
import { Eye, MoreHorizontal, Search, Receipt, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(placeholderTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const { toast } = useToast();

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      format(new Date(transaction.timestamp), "dd MMM yyyy", { locale: localeID }).toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [transactions, searchTerm]);

  const handleDelete = (transactionId: string) => {
    // In a real app, this would be an API call or server action
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
    toast({
      title: "Transaksi Dihapus",
      description: `Transaksi ${transactionId} telah berhasil dihapus.`,
    });
    setTransactionToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Riwayat Transaksi</h1>
          <p className="text-muted-foreground">Lihat semua transaksi yang telah tercatat.</p>
        </div>
        {/* Optional: Add transaction button if manual entry is needed, usually not for POS */}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari transaksi (ID, nama produk, tanggal)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-1/2 lg:w-1/3"
            />
          </div>
        </CardHeader>
      </Card>

      {filteredTransactions.length === 0 ? (
         <div className="text-center py-12">
            <Receipt className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Belum Ada Transaksi</h3>
            <p className="text-muted-foreground">Belum ada data transaksi yang tercatat.</p>
        </div>
      ) : (
        <Card className="shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jumlah Item</TableHead>
                <TableHead>Metode Bayar</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs">{transaction.id.substring(0,8).toUpperCase()}</TableCell>
                  <TableCell>{format(new Date(transaction.timestamp), "dd MMM yyyy, HH:mm", { locale: localeID })}</TableCell>
                  <TableCell className="text-center">{transaction.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{transaction.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">{formatCurrency(transaction.totalAmount)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Link href={`/transactions/${transaction.id}`} passHref>
                            <Button variant="outline" size="sm" className="h-8">
                                <Eye className="mr-1 h-3.5 w-3.5" /> Detail
                            </Button>
                        </Link>
                         {/* Delete functionality might be risky for transactions, usually voided instead. For MVP, simple delete. */}
                        {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80" onClick={() => setTransactionToDelete(transaction)}>
                            <Trash2 className="h-4 w-4" />
                        </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      
      {transactionToDelete && (
        <AlertDialog open={!!transactionToDelete} onOpenChange={() => setTransactionToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Transaksi Ini?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus transaksi <strong className="font-semibold">{transactionToDelete.id}</strong>? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(transactionToDelete.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Ya, Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </div>
  );
}
