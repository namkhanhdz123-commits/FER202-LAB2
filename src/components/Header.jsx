import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h2>Mini Movie Manager</h2>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? "🌙 Dark" : "☀️️ Light"}
      </button>
    </header>
  );
}
