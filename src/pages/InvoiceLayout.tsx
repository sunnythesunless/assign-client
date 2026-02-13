import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";

export default function InvoiceLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app">
            <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
            >
                <FiMenu />
            </button>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="app-content">
                <Outlet />
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 25,
                    }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
