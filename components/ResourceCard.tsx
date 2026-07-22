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
    <div style={{ border: "1px solid #444", borderRadius: 8, padding: 12, marginBottom: 8 }}>
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

      <button onClick={() => onEdit(resource)}>Editar</button>
      <button onClick={() => onDelete(resource.id)}>Eliminar</button>
    </div>
  );
}