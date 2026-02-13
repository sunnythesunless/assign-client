import { FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";

export default function WelcomePage() {
    return (
        <div className="main-content">
            <motion.div
                className="welcome-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="welcome-icon">
                    <FiFileText />
                </div>
                <h1 className="welcome-title">Welcome to InvoiceFlow</h1>
                <p className="welcome-subtitle">
                    Select an invoice from the sidebar to view its details, manage payments, and download PDFs.
                </p>
            </motion.div>
        </div>
    );
}
