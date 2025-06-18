
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle } from "lucide-react";

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold flex items-center">
            <Building2 className="mr-3 h-7 w-7 text-primary" />
            Daftar Departemen
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola departemen untuk organisasi item menu (misal: Dapur, Bar, Kasir).
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5"/> Tambah Departemen
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Pengelolaan Departemen</CardTitle>
          <CardDescription>
            Fitur ini sedang dalam pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nantinya, Anda akan dapat menambah, mengedit, dan menghapus departemen di sini.
            Departemen dapat digunakan untuk memfilter produk di POS atau untuk keperluan laporan internal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
