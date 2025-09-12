import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <ActionSheetProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="DocUpload" />
      <Stack.Screen name="Request" />
      <Stack.Screen name="calculator" />
      <Stack.Screen name="NeedHelp" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="notification2" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="home" />
      <Stack.Screen name="Agreement" />
      <Stack.Screen name="ExistingApplication" />
      <Stack.Screen name="submitApplication4" />
      <Stack.Screen name="submitApplication3" />
      <Stack.Screen name="submitApplication2" />
      <Stack.Screen name="submitApplication" />
    </Stack>
    </ActionSheetProvider>
  );
}
