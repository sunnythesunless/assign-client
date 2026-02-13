import { motion } from "framer-motion";
import { FiList } from "react-icons/fi";
import { InvoiceLine, CurrencyCode } from "../types";
import { formatCurrency } from "../utils/formatters";

interface Props {
    lineItems: InvoiceLine[];
    currency: CurrencyCode;
}

export default function LineItemsTable({ lineItems, currency }: Props) {
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
        >
            <div className="card-header">
                <h2 className="card-title">
                    <FiList className="card-title-icon" />
                    Line Items
                </h2>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineItems.map((item, index) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + index * 0.05 }}
                            >
                                <td style={{ fontWeight: 500 }}>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{formatCurrency(item.unitPrice, currency)}</td>
                                <td style={{ fontWeight: 600 }}>{formatCurrency(item.lineTotal, currency)}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
