
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { placeholderExpenses } from "@/lib/placeholder-data";
import type { Expense } from "@/lib/types";
import { PlusCircle, Edit, Trash2, MoreHorizontal, Search, CalendarIcon, Banknote } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const expenseFormSchema = z.object({
  description: z.string().min(3, { message: "Deskripsi minimal 3 karakter." }).max(100),
  amount: z.coerce.number().min(1, { message: "Jumlah harus lebih dari 0." }),
  date: z.date({ required_error: "Tanggal harus diisi." }),
  category: z.string().min(1, { message: "Kategori harus dipilih." }),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const expenseCategories = ["Operasional", "Pembelian Stok", "Gaji Karyawan", "Sewa Tempat", "Listrik & Air", "Transportasi", "Pemasaran", "Lainnya"];


export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(placeholderExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const { toast } = useToast();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: { description: '', amount: 0, date: new Date(), category: '' },
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(expense.date), "dd MMM yyyy", { locale: localeID }).toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, searchTerm]);

  const handleOpenForm = (expense?: Expense) => {
    if (expense) {
      setEditingExpense(expense);
      form.reset({ 
        description: expense.description, 
        amount: expense.amount, 
        date: new Date(expense.date), 
        category: expense.category 
      });
    } else {
      setEditingExpense(null);
      form.reset({ description: '', amount: 0, date: new Date(), category: '' });
    }
    setIsFormOpen(true);
  };

  const onSubmit = (data: ExpenseFormValues) => {
    if (editingExpense) {
      setExpenses(prev => prev.map(exp => exp.id === editingExpense.id ? { ...exp, ...data, date: new Date(data.date) } : exp));
      toast({ title: "Pengeluaran Diperbarui", description: `Pengeluaran "${data.description}" berhasil diperbarui.` });
    } else {
      const newExpense: Expense = { id: `exp${Date.now()}`, ...data, date: new Date(data.date) };
      setExpenses(prev => [newExpense, ...prev]);
      toast({ title: "Pengeluaran Dicatat", description: `Pengeluaran "${data.description}" berhasil dicatat.` });
    }
    setIsFormOpen(false);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
    toast({ title: "Pengeluaran Dihapus", description: "Data pengeluaran berhasil dihapus." });
    setExpenseToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Catatan Pengeluaran</h1>
          <p className="text-muted-foreground">Kelola semua biaya operasional toko Anda.</p>
        </div>
        <Button onClick={() => handleOpenForm()} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
          <PlusCircle className="mr-2 h-5 w-5" /> Catat Pengeluaran Baru
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="p-4">
           <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pengeluaran (deskripsi, kategori, tanggal)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-1/2 lg:w-1/3"
            />
          </div>
        </CardHeader>
      </Card>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12">
            <Banknote className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Belum Ada Pengeluaran</h3>
            <p className="text-muted-foreground">Mulai catat pengeluaran untuk melacak biaya operasional.</p>
             <Button onClick={() => handleOpenForm()} className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Catat Pengeluaran
            </Button>
        </div>
      ) : (
        <Card className="shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{format(new Date(expense.date), "dd MMM yyyy", { locale: localeID })}</TableCell>
                  <TableCell className="font-medium max-w-sm truncate" title={expense.description}>{expense.description}</TableCell>
                  <TableCell className="text-muted-foreground">{expense.category}</TableCell>
                  <TableCell className="text-right font-semibold text-destructive">{formatCurrency(expense.amount)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenForm(expense)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setExpenseToDelete(expense)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Expense Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingExpense ? 'Edit Pengeluaran' : 'Catat Pengeluaran Baru'}</DialogTitle>
            <DialogDescription>
              Lengkapi detail pengeluaran di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Input id="description" {...form.register('description')} className="mt-1" />
              {form.formState.errors.description && <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="amount">Jumlah (IDR)</Label>
              <Input id="amount" type="number" {...form.register('amount')} className="mt-1" />
              {form.formState.errors.amount && <p className="text-sm text-destructive mt-1">{form.formState.errors.amount.message}</p>}
            </div>
            
            <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                    <div>
                        <Label htmlFor="date">Tanggal</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal mt-1",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP", { locale: localeID }) : <span>Pilih tanggal</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                locale={localeID}
                            />
                            </PopoverContent>
                        </Popover>
                        {form.formState.errors.date && <p className="text-sm text-destructive mt-1">{form.formState.errors.date.message}</p>}
                    </div>
                )}
            />

            <Controller
              control={form.control}
              name="category"
              render={({ field }) => (
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="category" className="mt-1">
                      <SelectValue placeholder="Pilih kategori pengeluaran" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.category && <p className="text-sm text-destructive mt-1">{form.formState.errors.category.message}</p>}
                </div>
              )}
            />

            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Batal</Button></DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Menyimpan..." : "Simpan Pengeluaran"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {expenseToDelete && (
        <AlertDialog open={!!expenseToDelete} onOpenChange={() => setExpenseToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menghapus data pengeluaran <strong className="font-semibold">{expenseToDelete.description}</strong> secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteExpense(expenseToDelete.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Ya, Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

