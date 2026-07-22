"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar recurso por nombre..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}