"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { API } from "@/lib/api";
import useAuth from "@/store/useAuth";
import styles from "@/styles/login.module.css";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("gnanalytica_user", JSON.stringify(data.user));
      setUser(data.user);
      setTimeout(() => {
        window.location.href = "/chat";
      }, 100);
    } catch (err) {
      alert(`Login failed: ${err.response?.data?.message || "Please check credentials."}`);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* overlay and floating orbs */}
      <div className={styles.overlay}></div>
      <div className={`${styles.orb} ${styles.pink}`} />
      <div className={`${styles.orb} ${styles.indigo}`} />

      {/* login card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.card}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-500 flex items-center justify-center text-white text-2xl shadow-lg">
          💬
        </div>

        <h1 className="text-lg font-semibold text-white mb-2">
          Login to your account
        </h1>
        <p className="text-xs text-gray-300 mb-5">
          Sign in to continue your journey
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className={styles.footer}>
          Don’t have an account?{" "}
          <Link href="/register" className={styles.link}>Sign up</Link>
          
          
        </p>
      </motion.div>
    </div>
  );
}