"use client";

import { useState, useEffect } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Error leyendo sessionStorage key "${key}":`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando sessionStorage key "${key}":`, error);
    }
  }, [key, value, isHydrated]);

  return [value, setValue] as const;
}