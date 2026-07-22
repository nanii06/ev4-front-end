export function getSuggestionForCategory(categoria: string): string {
  const categoriaLower = categoria.toLowerCase();

  if (categoriaLower.includes("red") || categoriaLower.includes("router") || categoriaLower.includes("switch")) {
    return "Sugerencia IA: revisa la disponibilidad de este equipo antes de asignarlo a una práctica de laboratorio.";
  }

  if (categoriaLower.includes("impresora") || categoriaLower.includes("3d")) {
    return "Sugerencia IA: verifica el estado del material/filamento antes de programar una nueva impresión.";
  }

  if (categoriaLower.includes("sensor") || categoriaLower.includes("iot") || categoriaLower.includes("arduino")) {
    return "Sugerencia IA: comprueba la calibración del sensor antes de usarlo en un nuevo experimento.";
  }

  if (categoriaLower.includes("cámara") || categoriaLower.includes("camara")) {
    return "Sugerencia IA: revisa el almacenamiento y batería disponibles antes de la sesión de uso.";
  }

  if (categoriaLower.includes("notebook") || categoriaLower.includes("computador")) {
    return "Sugerencia IA: confirma que el equipo tenga las actualizaciones de software al día antes de asignarlo.";
  }

  return "Sugerencia IA: no hay recomendaciones específicas para esta categoría; revisa el estado general antes de asignar el recurso.";
}