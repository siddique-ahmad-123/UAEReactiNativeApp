import CustomButton from "@/components/CustomButton";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { useApplicationStore } from "@/store/applicationStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const STORAGE_KEY = "user";

const MenuScreen: React.FC = () => {
  const router = useRouter();

  // use hook to manage user session
  const { clearStorage } = useAsyncStorage(STORAGE_KEY);
  const { resetForm } = useApplicationStore();
  const handleLogout = async () => {
    try {
      await clearStorage();
      resetForm();
      router.replace("/(auth)/login");
    } catch (e) {
      console.error("Error clearing user data", e);
    }
  };

  return (
    <CustomMainChild title="Menu">
      <View style={styles.container}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          type="outlined"
          size="lg"
        />
      </View>
    </CustomMainChild>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, marginBottom: 20 },
});

export default MenuScreen;
