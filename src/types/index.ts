// ── Invoice Types ───────────────────────────────────────────────────────────

export type InvoiceStatus = "DRAFT" | "PAID" | "OVERDUE";
export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR";

export interface InvoiceLine {
    id: number;
    invoiceId: number;
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

export interface Payment {
    id: number;
    invoiceId: number;
    amount: number;
    paymentDate: string;
    note: string | null;
}

export interface Invoice {
    id: number;
    invoiceNumber: string;
    customerName: string;
    issueDate: string;
    dueDate: string;
    status: InvoiceStatus;
    total: number;
    amountPaid: number;
    balanceDue: number;
    currency: CurrencyCode;
    taxRate: number;
    taxAmount: number;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number | null;
    lineItems: InvoiceLine[];
    payments: Payment[];
    user?: { id: number; name: string; email: string };
}

// ── Auth Types ──────────────────────────────────────────────────────────────

export interface User {
    id: number;
    email: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

// ── API Response Types ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface InvoiceListResponse {
    invoices: Invoice[];
    pagination: PaginationInfo;
}
