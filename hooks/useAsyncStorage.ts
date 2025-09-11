// hooks/useAsyncStorage.ts
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage<T = any>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | null>(initialValue ?? null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load value
  const loadValue = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        setValue(JSON.parse(jsonValue));
      } else {
        setValue(null);
      }
    } catch (e) {
      console.log("❌ Error loading value", e);
    } finally {
      setLoading(false);
    }
  }, [key]);

  // 🔹 Save value
  const storeValue = useCallback(
    async (newValue: T) => {
      try {
        const jsonValue = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, jsonValue);
        setValue(newValue);
      } catch (e) {
        console.log("❌ Error storing value", e);
      }
    },
    [key]
  );

  // 🔹 Remove specific key
  const removeValue = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(null);
    } catch (e) {
      console.log("❌ Error removing value", e);
    }
  }, [key]);

  // 🔹 Clear ALL keys
  const clearStorage = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      setValue(null);
    } catch (e) {
      console.log("❌ Error clearing storage", e);
    }
  }, []);

  useEffect(() => {
    loadValue();
  }, [loadValue]);

  return { value, loading, storeValue, removeValue, clearStorage, refresh: loadValue };
}
