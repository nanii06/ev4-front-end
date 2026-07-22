// hooks/useLocalStorage.ts
"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Leer el valor real desde localStorage DESPUÉS de montar en el cliente
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Error leyendo localStorage key "${key}":`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  // Guardar en localStorage cada vez que cambia el valor,
  // pero solo una vez que ya hidrató (para no sobreescribir con el valor inicial vacío)
  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando localStorage key "${key}":`, error);
    }
  }, [key, value, isHydrated]);

  return [value, setValue] as const;
}