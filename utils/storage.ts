import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user";

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Storage set error:", e);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log("Storage get error:", e);
    return null;
  }
};

export const setUser = async (user: any) => setItem(USER_KEY, user);

export const getUser = async () => getItem(USER_KEY);

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.log("Storage clear error:", e);
  }
};
