import { motion } from "framer-motion";
import { FiCalendar, FiDownload, FiArchive, FiRotateCcw } from "react-icons/fi";
import { Invoice } from "../types";
import { formatDate, getStatusColor, getStatusBgColor, getDaysUntilDue } from "../utils/formatters";

interface Props {
    invoice: Invoice;
    onArchive: () => void;
    onRestore: () => void;
    onDownloadPdf: () => void;
}

export default function InvoiceHeader({ invoice, onArchive, onRestore, onDownloadPdf }: Props) {
    const daysUntilDue = getDaysUntilDue(invoice.dueDate);

    return (
        <motion.div
            className="invoice-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="invoice-header-top">
                <div className="invoice-title-group">
                    <h1 className="invoice-number">{invoice.invoiceNumber}</h1>
                    <p className="invoice-customer">{invoice.customerName}</p>
                </div>

                <div className="invoice-actions">
                    <motion.span
                        className="status-badge"
                        style={{
                            color: getStatusColor(invoice.status),
                            background: getStatusBgColor(invoice.status),
                        }}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span
                            className="status-dot"
                            style={{ background: getStatusColor(invoice.status) }}
                        />
                        {invoice.status}
                    </motion.span>

                    <button className="btn btn-secondary" onClick={onDownloadPdf} title="Download PDF">
                        <FiDownload /> PDF
                    </button>

                    {!invoice.isArchived ? (
                        <button className="btn btn-ghost" onClick={onArchive} title="Archive">
                            <FiArchive />
                        </button>
                    ) : (
                        <button className="btn btn-ghost" onClick={onRestore} title="Restore">
                            <FiRotateCcw />
                        </button>
                    )}
                </div>
            </div>

            <div className="invoice-header-meta">
                <div className="meta-item">
                    <span className="meta-label">Issue Date</span>
                    <span className="meta-value">
                        <FiCalendar className="meta-value-icon" />
                        {formatDate(invoice.issueDate)}
                    </span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Due Date</span>
                    <span className="meta-value">
                        <FiCalendar className="meta-value-icon" />
                        {formatDate(invoice.dueDate)}
                        {invoice.status !== "PAID" && daysUntilDue > 0 && (
                            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginLeft: 6 }}>
                                ({daysUntilDue} days left)
                            </span>
                        )}
                        {invoice.status !== "PAID" && daysUntilDue <= 0 && (
                            <span style={{ fontSize: "0.7rem", color: "var(--color-danger)", marginLeft: 6 }}>
                                (Overdue)
                            </span>
                        )}
                    </span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Currency</span>
                    <span className="meta-value">{invoice.currency}</span>
                </div>
                {invoice.taxRate > 0 && (
                    <div className="meta-item">
                        <span className="meta-label">Tax Rate</span>
                        <span className="meta-value">{invoice.taxRate}%</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
