"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useCookie(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = Cookies.get(key);
    if (stored) {
      setValue(stored);
    }
    setIsHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;
    Cookies.set(key, value, { expires: 30 }); // dura 30 días
  }, [key, value, isHydrated]);

  return [value, setValue] as const;
}