import { Stack } from "expo-router";

export default function JourneyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="creditCard/incomeDetail/borrower" />
      <Stack.Screen name="creditCard/incomeDetail/coBorrower" />
    </Stack>
  );
}
