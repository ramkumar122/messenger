"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { API } from "@/lib/api";
import useAuth from "@/store/useAuth";
import styles from "@/styles/register.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("gnanalytica_user", JSON.stringify(data.user));
      setUser(data.user);
      setTimeout(() => {
        window.location.href = "/chat";
      }, 100);
    } catch (err) {
      alert("Registration failed. Please check your input and try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.overlay} />

      {/* amber + teal orbs */}
      <div className="absolute w-[350px] h-[350px] bg-amber-400/25 rounded-full blur-[80px] -top-20 -left-24 animate-blob" />
      <div className="absolute w-[320px] h-[320px] bg-emerald-400/25 rounded-full blur-[80px] -bottom-20 -right-16 animate-blob animation-delay-2000" />

      {/* register form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.card}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg">
          🌱
        </div>

        <h1 className="text-lg font-semibold text-white mb-2">Create an account</h1>
        <p className="text-xs text-gray-300 mb-5">Join and start chatting instantly.</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
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
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}