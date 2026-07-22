// components/ResourceCard.tsx
"use client";

import { Resource } from "@/types/Resource";
import { getSuggestionForCategory } from "@/utils/aiSuggestions";

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

export default function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  return (
    <div
      className="resource-card"
      style={{
        border: "1px solid #2a2a2a",
        borderRadius: 12,
        padding: 16,
        backgroundColor: "#161616",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <h3>{resource.nombre}</h3>
      <p>Categoría: {resource.categoria}</p>
      <p>Cantidad: {resource.cantidad}</p>
      <p>Estado: {resource.estado}</p>
      <p>Ubicación: {resource.ubicacion}</p>
      {resource.responsable && <p>Responsable: {resource.responsable}</p>}
      {resource.descripcion && <p>{resource.descripcion}</p>}
      <p>Registrado: {resource.fechaRegistro}</p>

      <p style={{ fontStyle: "italic", opacity: 0.8 }}>
        {getSuggestionForCategory(resource.categoria)}
      </p>

      <div style={{ marginTop: 8 }}>
        <button onClick={() => onEdit(resource)}>Editar</button>
        <button onClick={() => onDelete(resource.id)}>Eliminar</button>
      </div>
    </div>
  );
}