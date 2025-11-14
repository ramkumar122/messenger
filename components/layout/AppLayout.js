// components/layout/AppLayout.js
"use client";

import Sidebar from "./Sidebar"; // same folder
import styles from "@/styles/background.module.css"; // keep alias if it works for you

export default function AppLayout({ children }) {
  return (
    <div className={styles.bgWrapper}>
  <div className="relative z-10 flex flex-col min-h-screen w-full text-white">
    <main className="flex-1 w-full h-full overflow-y-auto">
      {children}
    </main>
  </div>
</div>
  );
}