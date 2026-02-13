import { CurrencyCode } from "../types";

export function formatCurrency(amount: number, currency: CurrencyCode = "USD"): string {
    const localeMap: Record<CurrencyCode, string> = {
        USD: "en-US",
        EUR: "de-DE",
        GBP: "en-GB",
        INR: "en-IN",
    };

    return new Intl.NumberFormat(localeMap[currency] || "en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatDateLong(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function getDaysUntilDue(dueDate: string): number {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getStatusColor(status: string): string {
    switch (status) {
        case "PAID": return "var(--color-success)";
        case "DRAFT": return "var(--color-warning)";
        case "OVERDUE": return "var(--color-danger)";
        default: return "var(--color-muted)";
    }
}

export function getStatusBgColor(status: string): string {
    switch (status) {
        case "PAID": return "var(--color-success-bg)";
        case "DRAFT": return "var(--color-warning-bg)";
        case "OVERDUE": return "var(--color-danger-bg)";
        default: return "var(--color-muted-bg)";
    }
}
