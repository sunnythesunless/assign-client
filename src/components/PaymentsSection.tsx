import { motion } from "framer-motion";
import { FiCreditCard, FiPlus, FiDollarSign } from "react-icons/fi";
import { Payment, CurrencyCode } from "../types";
import { formatCurrency, formatDate } from "../utils/formatters";

interface Props {
    payments: Payment[];
    currency: CurrencyCode;
    isPaid: boolean;
    isArchived: boolean;
    onAddPayment: () => void;
}

export default function PaymentsSection({ payments, currency, isPaid, isArchived, onAddPayment }: Props) {
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
        >
            <div className="card-header">
                <h2 className="card-title">
                    <FiCreditCard className="card-title-icon" />
                    Payments
                    {payments.length > 0 && (
                        <span style={{
                            fontSize: "0.7rem",
                            background: "var(--color-accent-light)",
                            color: "var(--color-accent)",
                            padding: "2px 8px",
                            borderRadius: "var(--radius-full)",
                            fontWeight: 600,
                        }}>
                            {payments.length}
                        </span>
                    )}
                </h2>

                {!isPaid && !isArchived && (
                    <motion.button
                        className="btn btn-primary"
                        onClick={onAddPayment}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FiPlus /> Record Payment
                    </motion.button>
                )}
            </div>

            {payments.length === 0 ? (
                <div className="payment-empty">
                    <div className="payment-empty-icon">💳</div>
                    <p className="payment-empty-text">No payments recorded yet</p>
                </div>
            ) : (
                <div className="payment-list">
                    {payments.map((payment, index) => (
                        <motion.div
                            key={payment.id}
                            className="payment-item"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 + index * 0.06 }}
                        >
                            <div className="payment-icon">
                                <FiDollarSign />
                            </div>
                            <div className="payment-info">
                                <div className="payment-amount">
                                    {formatCurrency(payment.amount, currency)}
                                </div>
                                <div className="payment-meta">
                                    <span>{formatDate(payment.paymentDate)}</span>
                                    {payment.note && <span>• {payment.note}</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
