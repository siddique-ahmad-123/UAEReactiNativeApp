import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApplicationStore } from "@/store/applicationStore";

const STORAGE_KEY = "user";

const MenuScreen: React.FC = () => {
  const router = useRouter();

  // use hook to manage user session
  const { clearStorage } = useAsyncStorage(STORAGE_KEY);
  const {resetForm} = useApplicationStore();
  const handleLogout = async () => {
    try {
      await clearStorage(); 
      resetForm();
      router.replace("/(auth)/login");      
    } catch (e) {
      console.error("Error clearing user data", e);
    }
  };

  // ✅ return should be here, not inside handleLogout
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu Screen</Text>

      <CustomButton
        title="Logout"
        onPress={handleLogout}
        variant="secondary"
        type="outlined"
        size="lg"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, marginBottom: 20 },
});

export default MenuScreen;
