import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FiFileText } from "react-icons/fi";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
            toast.success(isLogin ? "Welcome back!" : "Account created!");
            navigate("/");
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = () => {
        setEmail("demo@invoice.app");
        setPassword("password123");
        setIsLogin(true);
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="auth-logo">
                    <div className="auth-logo-icon">
                        <FiFileText />
                    </div>
                    <h1 className="auth-title">InvoiceFlow</h1>
                    <p className="auth-subtitle">
                        {isLogin ? "Sign in to your account" : "Create a new account"}
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                key="name"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        className="form-input"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            className="form-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary auth-submit"
                        disabled={loading}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                    </motion.button>
                </form>

                <div className="auth-toggle">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </div>

                <div className="auth-demo">
                    <p className="auth-demo-text">Quick demo access:</p>
                    <button type="button" onClick={fillDemo}>
                        Use demo credentials
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
