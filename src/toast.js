import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] px-6 py-3 rounded shadow-lg text-white font-semibold transition-transform duration-300 animate-slide-in ${
        type === "success" ? "bg-emerald-500" : "bg-red-500"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
}
