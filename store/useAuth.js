import { create } from "zustand";

const useAuth = create((set) => ({
  user:
  typeof window !== "undefined"
    ? (() => {
        try {
          const stored = localStorage.getItem("gnanalytica_user");
          return stored ? JSON.parse(stored) : null;
        } catch {
          return null;
        }
      })()
    : null,


  setUser: (user) => {
    set({ user });
    if (typeof window !== "undefined") {
      localStorage.setItem("gnanalytica_user", JSON.stringify(user));
    }
  },

  logout: () => {
    set({ user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("gnanalytica_user");
      localStorage.removeItem("token");
    }
  },
}));

export default useAuth;