import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFileText, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useInvoiceList } from "../hooks/useInvoice";
import { getStatusColor, getStatusBgColor } from "../utils/formatters";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { user, logout } = useAuth();
    const { invoices, loading } = useInvoiceList();
    const { id } = useParams();

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            {/* Logo */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">
                        <FiFileText />
                    </div>
                    <div className="sidebar-logo-text">
                        Invoice<span>Flow</span>
                    </div>
                </div>
            </div>

            {/* Invoice List */}
            <nav className="sidebar-nav">
                <div className="sidebar-section-title">Invoices</div>

                {loading ? (
                    <div style={{ padding: "16px", textAlign: "center" }}>
                        <div className="spinner" style={{ width: 24, height: 24, margin: "0 auto" }} />
                    </div>
                ) : (
                    invoices.map((inv, index) => (
                        <motion.div
                            key={inv.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <NavLink
                                to={`/invoices/${inv.id}`}
                                className={`sidebar-item ${String(inv.id) === id ? "active" : ""}`}
                                onClick={onClose}
                            >
                                <div className="sidebar-invoice-info">
                                    <div className="sidebar-invoice-number">{inv.invoiceNumber}</div>
                                    <div className="sidebar-invoice-customer">{inv.customerName}</div>
                                </div>
                                <span
                                    className="sidebar-invoice-status"
                                    style={{
                                        color: getStatusColor(inv.status),
                                        background: getStatusBgColor(inv.status),
                                    }}
                                >
                                    {inv.status}
                                </span>
                            </NavLink>
                        </motion.div>
                    ))
                )}
            </nav>

            {/* User */}
            {user && (
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">{user.name}</div>
                        <div className="sidebar-user-email">{user.email}</div>
                    </div>
                    <button
                        className="sidebar-logout-btn"
                        onClick={logout}
                        title="Sign out"
                    >
                        <FiLogOut />
                    </button>
                </div>
            )}
        </aside>
    );
}
