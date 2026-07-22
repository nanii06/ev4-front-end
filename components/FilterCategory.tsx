"use client";

interface FilterCategoryProps {
  categories: string[];
  selected: string;
  onChange: (categoria: string) => void;
}

export default function FilterCategory({ categories, selected, onChange }: FilterCategoryProps) {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      <option value="">Todas las categorías</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}