export type ResourceStatus = "Disponible" | "En uso" | "En mantención";

export interface Resource {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  estado: ResourceStatus;
  ubicacion: string;
  responsable?: string;
  fechaRegistro: string; // formato ISO, ej: "2026-07-21"
  descripcion?: string;
}