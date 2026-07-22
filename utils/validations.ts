import { Resource } from "@/types/Resource";

export interface ValidationErrors {
  nombre?: string;
  categoria?: string;
  cantidad?: string;
  ubicacion?: string;
  fechaRegistro?: string;
}

export function validateResource(
  data: Omit<Resource, "id">
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.nombre || data.nombre.trim().length === 0) {
    errors.nombre = "El nombre del recurso es obligatorio.";
  }

  if (!data.categoria || data.categoria.trim().length === 0) {
    errors.categoria = "La categoría es obligatoria.";
  }

  if (data.cantidad === undefined || data.cantidad === null || data.cantidad <= 0) {
    errors.cantidad = "La cantidad debe ser un número mayor a 0.";
  }

  if (!data.ubicacion || data.ubicacion.trim().length === 0) {
    errors.ubicacion = "La ubicación es obligatoria.";
  }

  if (!data.fechaRegistro) {
    errors.fechaRegistro = "La fecha de registro es obligatoria.";
  }

  return errors;
}