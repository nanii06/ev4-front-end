"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <h1>Gestión de Recursos Tecnológicos</h1>
      <ThemeToggle />
    </header>
  );
}