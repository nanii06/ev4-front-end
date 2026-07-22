
"use client";

import { Resource } from "@/types/Resource";
import ResourceCard from "./ResourceCard";

interface ResourceListProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

export default function ResourceList({ resources, onEdit, onDelete }: ResourceListProps) {
  if (resources.length === 0) {
    return <p>No hay recursos registrados todavía.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
        marginTop: 16,
      }}
    >
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}