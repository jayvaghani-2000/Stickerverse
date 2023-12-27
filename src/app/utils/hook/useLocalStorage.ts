"use client";
import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialState: T, schema: any) {
  const [entry, setEntry] = useState<T>(() => {
    const ISSERVER = typeof window === "undefined";
    if (ISSERVER) {
      return initialState;
    }
    const value = localStorage.getItem(key);
    if (value) {
      try {
        schema.parse(JSON.parse(value));
        return JSON.parse(value);
      } catch (err) {
        return initialState;
      }
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(entry));
  }, [entry]);

  return [entry, setEntry];
}

export default useLocalStorage;
