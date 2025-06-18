import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  variant?: 'default' | 'ghost';
  label?: string;
  subItems?: NavItem[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  barcode?: string;
  imageUrl?: string;
  categoryId: string;
  categoryName?: string; // Denormalized for convenience
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  subtotal: number;
  taxRate: number; // Percentage, e.g., 0.1 for 10%
  taxAmount: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // Value of discount (percentage or fixed amount)
  discountAmount: number;
  totalAmount: number;
  paymentMethod: string; // e.g., 'cash', 'card'
  timestamp: Date;
  notes?: string;
}

export interface Expense {
  id:string;
  description: string;
  amount: number;
  date: Date;
  category: string; // e.g., 'Rent', 'Utilities', 'Supplies'
}

export interface FinancialReport {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  startDate: Date;
  endDate: Date;
  incomeBreakdown?: { category: string; amount: number }[]; // Optional detailed breakdown
  expenseBreakdown?: { category: string; amount: number }[]; // Optional detailed breakdown
}
