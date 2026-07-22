"use client";

import { useState } from "react";
import { Resource, ResourceStatus } from "@/types/Resource";
import { validateResource, ValidationErrors } from "@/utils/validations";

interface ResourceFormProps {
  onSubmit: (resource: Resource) => void;
  initialData?: Resource;
}

const ESTADOS: ResourceStatus[] = ["Disponible", "En uso", "En mantención"];

export default function ResourceForm({ onSubmit, initialData }: ResourceFormProps) {
  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [categoria, setCategoria] = useState(initialData?.categoria ?? "");
  const [cantidad, setCantidad] = useState(initialData?.cantidad ?? 0);
  const [estado, setEstado] = useState<ResourceStatus>(initialData?.estado ?? "Disponible");
  const [ubicacion, setUbicacion] = useState(initialData?.ubicacion ?? "");
  const [responsable, setResponsable] = useState(initialData?.responsable ?? "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion ?? "");
  const [errors, setErrors] = useState<ValidationErrors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nuevoRecurso = {
      nombre,
      categoria,
      cantidad,
      estado,
      ubicacion,
      responsable,
      descripcion,
      fechaRegistro: initialData?.fechaRegistro ?? new Date().toISOString().split("T")[0],
    };

    const validationErrors = validateResource(nuevoRecurso);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      id: initialData?.id ?? crypto.randomUUID(),
      ...nuevoRecurso,
    });

    if (!initialData) {
      setNombre("");
      setCategoria("");
      setCantidad(0);
      setEstado("Disponible");
      setUbicacion("");
      setResponsable("");
      setDescripcion("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del recurso</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        {errors.nombre && <p>{errors.nombre}</p>}
      </div>

      <div>
        <label>Categoría</label>
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        {errors.categoria && <p>{errors.categoria}</p>}
      </div>

      <div>
        <label>Cantidad</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
        {errors.cantidad && <p>{errors.cantidad}</p>}
      </div>

      <div>
        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value as ResourceStatus)}>
          {ESTADOS.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Ubicación</label>
        <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
        {errors.ubicacion && <p>{errors.ubicacion}</p>}
      </div>

      <div>
        <label>Responsable (opcional)</label>
        <input value={responsable} onChange={(e) => setResponsable(e.target.value)} />
      </div>

      <div>
        <label>Descripción (opcional)</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>

      <button type="submit">{initialData ? "Guardar cambios" : "Agregar recurso"}</button>
    </form>
  );
}