"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { placeholderCategories } from "@/lib/placeholder-data";
import type { Category } from "@/lib/types";
import { PlusCircle, Edit, Trash2, MoreHorizontal, Search, Tags } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Nama kategori minimal 2 karakter." }).max(50),
  description: z.string().max(200, { message: "Deskripsi maksimal 200 karakter." }).optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(placeholderCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const { toast } = useToast();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: '', description: '' },
  });

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [categories, searchTerm]);

  const handleOpenForm = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      form.reset({ name: category.name, description: category.description || '' });
    } else {
      setEditingCategory(null);
      form.reset({ name: '', description: '' });
    }
    setIsFormOpen(true);
  };

  const onSubmit = (data: CategoryFormValues) => {
    if (editingCategory) {
      setCategories(prev => prev.map(cat => cat.id === editingCategory.id ? { ...cat, ...data } : cat));
      toast({ title: "Kategori Diperbarui", description: `Kategori "${data.name}" berhasil diperbarui.` });
    } else {
      const newCategory: Category = { id: `cat${Date.now()}`, ...data };
      setCategories(prev => [newCategory, ...prev]);
      toast({ title: "Kategori Ditambahkan", description: `Kategori "${data.name}" berhasil ditambahkan.` });
    }
    setIsFormOpen(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    toast({ title: "Kategori Dihapus", description: "Kategori berhasil dihapus." });
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Manajemen Kategori</h1>
          <p className="text-muted-foreground">Kelola kategori produk Anda.</p>
        </div>
        <Button onClick={() => handleOpenForm()} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
          <PlusCircle className="mr-2 h-5 w-5" /> Tambah Kategori Baru
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-1/2 lg:w-1/3"
            />
          </div>
        </CardHeader>
      </Card>

      {filteredCategories.length === 0 ? (
         <div className="text-center py-12">
            <Tags className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Belum Ada Kategori</h3>
            <p className="text-muted-foreground">Mulai tambahkan kategori untuk produk Anda.</p>
            <Button onClick={() => handleOpenForm()} className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Kategori
            </Button>
        </div>
      ) : (
        <Card className="shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate" title={category.description}>
                    {category.description || '-'}
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleOpenForm(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setCategoryToDelete(category)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
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

      {/* Category Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}</DialogTitle>
            <DialogDescription>
              Lengkapi detail kategori di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">Nama Kategori</Label>
              <Input id="name" {...form.register('name')} className="mt-1" />
              {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="description" className="text-right">Deskripsi (Opsional)</Label>
              <Textarea id="description" {...form.register('description')} className="mt-1 resize-none" />
              {form.formState.errors.description && <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Batal</Button>
              </DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {categoryToDelete && (
        <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menghapus kategori <strong className="font-semibold">{categoryToDelete.name}</strong> secara permanen. Ini mungkin mempengaruhi produk yang terkait.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteCategory(categoryToDelete.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Ya, Hapus Kategori
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
