// components/Header.tsx
"use client";

interface HeaderProps {
  theme: string;
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <h1>Gestión de Recursos Tecnológicos</h1>
      <button onClick={onToggleTheme}>
        Cambiar a modo {theme === "dark" ? "claro" : "oscuro"} (actual: {theme})
      </button>
    </header>
  );
}