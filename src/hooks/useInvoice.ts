import { useState, useEffect, useCallback } from "react";
import api from "../api";
import { Invoice, ApiResponse, InvoiceListResponse } from "../types";

export function useInvoice(id: string | undefined) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvoice = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const res = await api.get<ApiResponse<Invoice>>(`/invoices/${id}`);
            setInvoice(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to load invoice");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice]);

    const addPayment = async (amount: number, note?: string) => {
        if (!id) return;
        const res = await api.post<ApiResponse<{ payment: any; invoice: Invoice }>>(
            `/invoices/${id}/payments`,
            { amount, note }
        );
        setInvoice(res.data.data.invoice);
        return res.data.data;
    };

    const archiveInvoice = async () => {
        if (!id) return;
        await api.post(`/invoices/${id}/archive`);
        await fetchInvoice();
    };

    const restoreInvoice = async () => {
        if (!id) return;
        await api.post(`/invoices/${id}/restore`);
        await fetchInvoice();
    };

    return { invoice, loading, error, refetch: fetchInvoice, addPayment, archiveInvoice, restoreInvoice };
}

export function useInvoiceList() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvoices = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get<ApiResponse<InvoiceListResponse>>("/invoices?limit=50");
            setInvoices(res.data.data.invoices);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to load invoices");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    return { invoices, loading, error, refetch: fetchInvoices };
}
