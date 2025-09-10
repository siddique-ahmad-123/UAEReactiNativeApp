import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="submitApplication" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="Request" />
      <Stack.Screen name="calculator" />
      <Stack.Screen name="NavScreen" />
      <Stack.Screen name="NeedHelp" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="notification2" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="selectcreditcard" />
      <Stack.Screen name="home" />
      <Stack.Screen name="Agreement" />
      <Stack.Screen name="SelectRequiredAmount" />
      <Stack.Screen name="ExistingApplication" />
    </Stack>
  );
}
