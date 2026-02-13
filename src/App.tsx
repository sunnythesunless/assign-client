import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import InvoiceLayout from "./pages/InvoiceLayout";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import WelcomePage from "./pages/WelcomePage";

export default function App() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route element={<InvoiceLayout />}>
                <Route index element={<WelcomePage />} />
                <Route path="invoices/:id" element={<InvoiceDetailPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
