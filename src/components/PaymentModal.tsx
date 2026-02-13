import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/formatters";

interface Props {
    balanceDue: number;
    currency: CurrencyCode;
    onSubmit: (amount: number, note?: string) => Promise<void>;
    onClose: () => void;
}

export default function PaymentModal({ balanceDue, currency, onSubmit, onClose }: Props) {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError("Please enter a valid amount greater than 0");
            return;
        }
        if (numAmount > balanceDue) {
            setError(`Amount cannot exceed balance due (${formatCurrency(balanceDue, currency)})`);
            return;
        }

        setLoading(true);
        try {
            await onSubmit(numAmount, note || undefined);
        } catch {
            // Error already handled by parent
        } finally {
            setLoading(false);
        }
    };

    const setFullAmount = () => {
        setAmount(balanceDue.toString());
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Record Payment</h2>
                        <button className="modal-close" onClick={onClose}>
                            <FiX />
                        </button>
                    </div>

                    <div className="form-balance-info">
                        <span className="form-balance-label">Balance Due</span>
                        <span className="form-balance-value">{formatCurrency(balanceDue, currency)}</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="payment-amount">
                                Payment Amount
                            </label>
                            <input
                                id="payment-amount"
                                className="form-input"
                                type="number"
                                step="0.01"
                                min="0.01"
                                max={balanceDue}
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setError("");
                                }}
                                autoFocus
                                required
                            />
                            <button
                                type="button"
                                onClick={setFullAmount}
                                style={{
                                    marginTop: 6,
                                    background: "none",
                                    color: "var(--color-accent)",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    padding: 0,
                                }}
                            >
                                Pay full amount
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="payment-note">
                                Note <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span>
                            </label>
                            <input
                                id="payment-note"
                                className="form-input"
                                type="text"
                                placeholder="e.g. Bank transfer, Cheque #123"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                maxLength={500}
                            />
                        </div>

                        {error && <p className="form-error" style={{ marginBottom: 16 }}>{error}</p>}

                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? "Processing..." : "Record Payment"}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
