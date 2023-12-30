"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function useLocalStorage<T>(key: string, initialState: T, schema: any) {
  const rendered = useRef(false);
  const [entry, setEntry] = useState<T>(() => {
    const ISSERVER = typeof window === "undefined";
    if (ISSERVER) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        schema.parse(JSON.parse(value));
        return JSON.parse(value);
      } catch (err) {
        localStorage.setItem(key, JSON.stringify(initialState));
        return initialState;
      }
    } else {
      localStorage.setItem(key, JSON.stringify(initialState));
      return initialState;
    }
  });

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    localStorage.setItem(key, JSON.stringify(entry));
  }, [entry]);

  return [entry, setEntry] as [T, Dispatch<SetStateAction<T>>];
}

export default useLocalStorage;
