import type { Product, Category, Transaction, Expense, CartItem } from './types';

export const placeholderCategories: Category[] = [
  { id: 'cat1', name: 'Minuman Dingin', description: 'Berbagai minuman dingin segar' },
  { id: 'cat2', name: 'Makanan Ringan', description: 'Camilan untuk menemani harimu' },
  { id: 'cat3', name: 'Kebutuhan Pokok', description: 'Barang kebutuhan sehari-hari' },
  { id: 'cat4', name: 'Alat Tulis', description: 'Perlengkapan sekolah dan kantor' },
];

export const placeholderProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Air Mineral Botol 600ml',
    price: 3500,
    stock: 150,
    barcode: '899000000001',
    imageUrl: 'https://placehold.co/300x200.png',
    categoryId: 'cat1',
    categoryName: 'Minuman Dingin',
    description: 'Air mineral murni dalam kemasan botol praktis.'
  },
  {
    id: 'prod2',
    name: 'Keripik Kentang Original 75g',
    price: 8000,
    stock: 75,
    barcode: '899000000002',
    imageUrl: 'https://placehold.co/300x200.png',
    categoryId: 'cat2',
    categoryName: 'Makanan Ringan',
    description: 'Keripik kentang renyah dengan rasa original.'
  },
  {
    id: 'prod3',
    name: 'Beras Premium 5kg',
    price: 65000,
    stock: 30,
    barcode: '899000000003',
    imageUrl: 'https://placehold.co/300x200.png',
    categoryId: 'cat3',
    categoryName: 'Kebutuhan Pokok',
    description: 'Beras pulen berkualitas premium.'
  },
  {
    id: 'prod4',
    name: 'Buku Tulis Sinar Dunia 38 Lembar',
    price: 2500,
    stock: 200,
    barcode: '899000000004',
    imageUrl: 'https://placehold.co/300x200.png',
    categoryId: 'cat4',
    categoryName: 'Alat Tulis',
    description: 'Buku tulis standar untuk catatan harian.'
  },
  {
    id: 'prod5',
    name: 'Teh Kotak Rasa Apel 200ml',
    price: 4000,
    stock: 90,
    barcode: '899000000005',
    imageUrl: 'https://placehold.co/300x200.png',
    categoryId: 'cat1',
    categoryName: 'Minuman Dingin',
    description: 'Minuman teh rasa apel yang menyegarkan.'
  },
  {
    id: 'prod6',
    name: 'Biskuit Cokelat Sandwich 100g',
    price: 6000,
    stock: 60,
    barcode: '899000000006',
    imageUrl: 'https://placehold.co/300x200.png',
    categoryId: 'cat2',
    categoryName: 'Makanan Ringan',
    description: 'Biskuit sandwich dengan krim cokelat lezat.'
  },
];

const sampleCartItems1: CartItem[] = [
  { ...placeholderProducts[0], quantity: 2 },
  { ...placeholderProducts[1], quantity: 1 },
];

const sampleCartItems2: CartItem[] = [
  { ...placeholderProducts[2], quantity: 1 },
  { ...placeholderProducts[3], quantity: 5 },
  { ...placeholderProducts[4], quantity: 3 },
];

export const placeholderTransactions: Transaction[] = [
  {
    id: 'trans1',
    items: sampleCartItems1,
    subtotal: (3500 * 2) + 8000,
    taxRate: 0.11, // 11%
    taxAmount: ((3500 * 2) + 8000) * 0.11,
    discountType: 'fixed',
    discountValue: 1000,
    discountAmount: 1000,
    totalAmount: ((3500 * 2) + 8000) + (((3500 * 2) + 8000) * 0.11) - 1000,
    paymentMethod: 'Cash',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    notes: 'Pelanggan ramah'
  },
  {
    id: 'trans2',
    items: sampleCartItems2,
    subtotal: 65000 + (2500*5) + (4000*3),
    taxRate: 0.11,
    taxAmount: (65000 + (2500*5) + (4000*3)) * 0.11,
    discountType: 'percentage',
    discountValue: 5, // 5%
    discountAmount: (65000 + (2500*5) + (4000*3)) * 0.05,
    totalAmount: (65000 + (2500*5) + (4000*3)) + ((65000 + (2500*5) + (4000*3)) * 0.11) - ((65000 + (2500*5) + (4000*3)) * 0.05),
    paymentMethod: 'Card',
    timestamp: new Date(),
  },
];

export const placeholderExpenses: Expense[] = [
  {
    id: 'exp1',
    description: 'Biaya Listrik Bulan Ini',
    amount: 250000,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Two days ago
    category: 'Utilities',
  },
  {
    id: 'exp2',
    description: 'Pembelian Stok ATK',
    amount: 150000,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Five days ago
    category: 'Supplies',
  },
  {
    id: 'exp3',
    description: 'Sewa Kios',
    amount: 1000000,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: 'Rent'
  }
];

export function getProductById(id: string): Product | undefined {
  return placeholderProducts.find(p => p.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return placeholderCategories.find(c => c.id === id);
}

export function getTransactionById(id: string): Transaction | undefined {
  return placeholderTransactions.find(t => t.id === id);
}
