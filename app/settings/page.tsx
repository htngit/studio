
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Pengaturan Aplikasi</h1>

      <Tabs defaultValue="product" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:max-w-md mb-6">
          <TabsTrigger value="product">Produk</TabsTrigger>
          <TabsTrigger value="inventory">Inventaris</TabsTrigger>
          <TabsTrigger value="receipt">Struk</TabsTrigger>
        </TabsList>

        <TabsContent value="product">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Produk</CardTitle>
              <CardDescription>
                Konfigurasi default untuk produk, satuan, dan opsi terkait lainnya.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultUnit">Satuan Default</Label>
                <Input id="defaultUnit" placeholder="Contoh: Pcs, Kg, Liter" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="autoSku" />
                <Label htmlFor="autoSku" className="text-sm font-normal">
                  Buat SKU secara otomatis untuk produk baru
                </Label>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-2">Notifikasi Produk</h3>
                <div className="flex items-center space-x-2">
                    <Checkbox id="lowStockNotifProduct" />
                    <Label htmlFor="lowStockNotifProduct" className="text-sm font-normal">
                        Notifikasi jika stok produk hampir habis
                    </Label>
                </div>
              </div>
              <Button>Simpan Pengaturan Produk</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Inventaris</CardTitle>
              <CardDescription>
                Opsi untuk metode pelacakan inventaris, notifikasi stok, dan integrasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="trackingMethod">Metode Pelacakan Stok</Label>
                <Input id="trackingMethod" placeholder="Contoh: FIFO, LIFO, Average" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Ambang Batas Stok Rendah</Label>
                <Input id="lowStockThreshold" type="number" placeholder="Contoh: 10" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="enableIntegrations" />
                <Label htmlFor="enableIntegrations" className="text-sm font-normal">
                  Aktifkan integrasi dengan supplier (jika ada)
                </Label>
              </div>
              <Button>Simpan Pengaturan Inventaris</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipt">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Struk</CardTitle>
              <CardDescription>
                Kustomisasi template struk, informasi toko, logo, dan footer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nama Toko di Struk</Label>
                <Input id="storeName" placeholder="Nama Toko Anda" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Alamat Toko di Struk</Label>
                <Input id="storeAddress" placeholder="Alamat Lengkap Toko" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiptFooter">Catatan Kaki Struk</Label>
                <Input id="receiptFooter" placeholder="Contoh: Terima kasih telah berbelanja!" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiptLogo">Logo Toko (URL)</Label>
                <Input id="receiptLogo" placeholder="https://example.com/logo.png" />
              </div>
              <Button>Simpan Pengaturan Struk</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
