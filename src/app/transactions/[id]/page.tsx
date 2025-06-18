import ReceiptView from '@/components/shared/receipt-view';
import { getTransactionById } from '@/lib/placeholder-data';
import type { Transaction } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Printer } from 'lucide-react';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const transactionId = params.id;
  const transaction: Transaction | undefined = getTransactionById(transactionId);

  if (!transaction) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-lg mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive text-xl">
              <AlertTriangle className="mr-2 h-6 w-6" /> Transaksi Tidak Ditemukan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Transaksi dengan ID <span className="font-mono bg-muted px-1 rounded">{transactionId}</span> tidak dapat ditemukan.</p>
            <Link href="/transactions">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Transaksi
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/transactions">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Button>
        </Link>
        <Button 
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Printer className="mr-2 h-4 w-4" /> Cetak Struk
        </Button>
      </div>
      <ReceiptView transaction={transaction} />
    </div>
  );
}
