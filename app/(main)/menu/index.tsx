import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";

const STORAGE_KEY = "user";

const MenuScreen: React.FC = () => {
  const router = useRouter();

  // use hook to manage user session
  const { removeValue } = useAsyncStorage(STORAGE_KEY);

  const handleLogout = async () => {
    try {
      await removeValue(); // clears session
      router.replace("/(auth)/login"); // back to login screen
    } catch (error) {
      console.log("❌ Error logging out", error);
    }
  };

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
