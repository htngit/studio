"use client";

import React from 'react';
import type { Transaction } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // For Indonesian date formatting

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

interface ReceiptViewProps {
  transaction: Transaction;
}

export default function ReceiptView({ transaction }: ReceiptViewProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg print-receipt-card">
      <CardHeader className="text-center p-6 bg-primary/5 rounded-t-lg">
        <CardTitle className="text-2xl font-headline text-primary">Toko Mudah</CardTitle>
        <CardDescription className="text-muted-foreground">Jl. Kemudahan No. 1, Kota Maju</CardDescription>
        <CardDescription className="text-muted-foreground">Telp: (021) 123-4567</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>No. Transaksi:</span>
            <span className="font-semibold">{transaction.id.substring(0,10).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal:</span>
            <span className="font-semibold">{format(new Date(transaction.timestamp), "dd MMM yyyy, HH:mm", { locale: id })}</span>
          </div>
          <div className="flex justify-between">
            <span>Kasir:</span>
            <span className="font-semibold">Admin Toko</span>
          </div>
           <div className="flex justify-between">
            <span>Metode Bayar:</span>
            <span className="font-semibold">{transaction.paymentMethod}</span>
          </div>
        </div>

        <Separator />

        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="h-auto p-1">Produk</TableHead>
              <TableHead className="h-auto p-1 text-center">Qty</TableHead>
              <TableHead className="h-auto p-1 text-right">Harga</TableHead>
              <TableHead className="h-auto p-1 text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="p-1 font-medium truncate max-w-[120px]" title={item.name}>{item.name}</TableCell>
                <TableCell className="p-1 text-center">{item.quantity}</TableCell>
                <TableCell className="p-1 text-right">{formatCurrency(item.price)}</TableCell>
                <TableCell className="p-1 text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator />

        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">{formatCurrency(transaction.subtotal)}</span>
          </div>
          {transaction.discountAmount > 0 && (
            <div className="flex justify-between">
              <span>Diskon ({transaction.discountType === 'percentage' ? `${transaction.discountValue}%` : 'Tetap'}):</span>
              <span className="font-semibold text-destructive">- {formatCurrency(transaction.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Pajak ({transaction.taxRate * 100}%):</span>
            <span className="font-semibold">{formatCurrency(transaction.taxAmount)}</span>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>TOTAL:</span>
            <span>{formatCurrency(transaction.totalAmount)}</span>
          </div>
        </div>
        
        {transaction.notes && (
          <>
            <Separator />
            <div className="text-sm">
                <p className="font-semibold">Catatan:</p>
                <p className="text-muted-foreground">{transaction.notes}</p>
            </div>
          </>
        )}

        <Separator />
        <p className="text-center text-xs text-muted-foreground pt-4">
          Terima kasih telah berbelanja di Toko Mudah!
          <br />
          Barang yang sudah dibeli tidak dapat dikembalikan.
        </p>
      </CardContent>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-receipt-card, .print-receipt-card * {
            visibility: visible;
          }
          .print-receipt-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            box-shadow: none;
            border: none;
          }
        }
      `}</style>
    </Card>
  );
}
