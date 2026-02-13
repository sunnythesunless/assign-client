import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";
import { Invoice } from "../types";
import { formatCurrency } from "../utils/formatters";
import { CurrencyCode } from "../types";

interface Props {
    invoice: Invoice;
}

export default function TotalsSection({ invoice }: Props) {
    const currency = invoice.currency as CurrencyCode;
    const subtotal = invoice.lineItems.reduce((sum, li) => sum + li.lineTotal, 0);
    const balanceClass = invoice.status === "PAID" ? "paid" : invoice.status === "OVERDUE" ? "overdue" : "";

    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
        >
            <div className="card-header">
                <h2 className="card-title">
                    <FiDollarSign className="card-title-icon" />
                    Summary
                </h2>
            </div>

            <div className="totals-section">
                <div className="totals-table">
                    <div className="totals-row subtotal">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal, currency)}</span>
                    </div>

                    {invoice.taxRate > 0 && (
                        <div className="totals-row tax">
                            <span>Tax ({invoice.taxRate}%)</span>
                            <span>{formatCurrency(invoice.taxAmount, currency)}</span>
                        </div>
                    )}

                    <div className="totals-row total">
                        <span>Total</span>
                        <span>{formatCurrency(invoice.total, currency)}</span>
                    </div>

                    <div className="totals-row paid">
                        <span>Amount Paid</span>
                        <span>-{formatCurrency(invoice.amountPaid, currency)}</span>
                    </div>

                    <motion.div
                        className={`totals-row balance ${balanceClass}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span>Balance Due</span>
                        <span>{formatCurrency(invoice.balanceDue, currency)}</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
