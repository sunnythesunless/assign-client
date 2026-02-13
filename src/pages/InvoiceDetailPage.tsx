import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useInvoice } from "../hooks/useInvoice";
import InvoiceHeader from "../components/InvoiceHeader";
import LineItemsTable from "../components/LineItemsTable";
import TotalsSection from "../components/TotalsSection";
import PaymentsSection from "../components/PaymentsSection";
import PaymentModal from "../components/PaymentModal";
import { FiAlertTriangle } from "react-icons/fi";

export default function InvoiceDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { invoice, loading, error, addPayment, archiveInvoice, restoreInvoice, refetch } = useInvoice(id);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading-screen">
                    <div className="spinner" />
                    <p className="loading-text">Loading invoice...</p>
                </div>
            </div>
        );
    }

    if (error || !invoice) {
        return (
            <div className="main-content">
                <div className="error-state">
                    <div className="error-icon"><FiAlertTriangle /></div>
                    <p className="error-message">{error || "Invoice not found"}</p>
                    <button className="btn btn-primary" onClick={refetch}>Try Again</button>
                </div>
            </div>
        );
    }

    const handleAddPayment = async (amount: number, note?: string) => {
        try {
            await addPayment(amount, note);
            toast.success(`Payment of ${amount} recorded successfully!`);
            setShowPaymentModal(false);
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Failed to record payment");
            throw err;
        }
    };

    const handleArchive = async () => {
        try {
            await archiveInvoice();
            toast.success("Invoice archived");
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Failed to archive");
        }
    };

    const handleRestore = async () => {
        try {
            await restoreInvoice();
            toast.success("Invoice restored");
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Failed to restore");
        }
    };

    const handleDownloadPdf = async () => {
        try {
            const response = await fetch(`/api/invoices/${id}/pdf`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${invoice.invoiceNumber}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("PDF downloaded!");
        } catch {
            toast.error("Failed to generate PDF");
        }
    };

    return (
        <div className="main-content">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Archived Banner */}
                {invoice.isArchived && (
                    <motion.div
                        className="archived-banner"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="archived-banner-text">
                            <FiAlertTriangle /> This invoice is archived
                        </span>
                        <button className="btn btn-secondary" onClick={handleRestore}>
                            Restore Invoice
                        </button>
                    </motion.div>
                )}

                {/* Header Section */}
                <InvoiceHeader
                    invoice={invoice}
                    onArchive={handleArchive}
                    onRestore={handleRestore}
                    onDownloadPdf={handleDownloadPdf}
                />

                {/* Line Items */}
                <LineItemsTable
                    lineItems={invoice.lineItems}
                    currency={invoice.currency}
                />

                {/* Totals */}
                <TotalsSection invoice={invoice} />

                {/* Payments */}
                <PaymentsSection
                    payments={invoice.payments}
                    currency={invoice.currency}
                    isPaid={invoice.status === "PAID"}
                    isArchived={invoice.isArchived}
                    onAddPayment={() => setShowPaymentModal(true)}
                />

                {/* Payment Modal */}
                {showPaymentModal && (
                    <PaymentModal
                        balanceDue={invoice.balanceDue}
                        currency={invoice.currency}
                        onSubmit={handleAddPayment}
                        onClose={() => setShowPaymentModal(false)}
                    />
                )}
            </motion.div>
        </div>
    );
}
