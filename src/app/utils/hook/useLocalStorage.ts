"use client";
import { useEffect, useRef, useState } from "react";

function useLocalStorage<T>(key: string, initialState: T, schema: any) {
  const rendered = useRef(false);
  const [entry, setEntry] = useState<T>(initialState);

  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (ISSERVER) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        schema.parse(JSON.parse(value));
        setEntry(JSON.parse(value));
      } catch (err) {
        setEntry(initialState);
      }
    } else {
      setEntry(initialState);
    }
  }, []);

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    localStorage.setItem(key, JSON.stringify(entry));
  }, [entry]);

  return [entry, setEntry];
}

export default useLocalStorage;
