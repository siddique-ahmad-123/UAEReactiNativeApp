import { Stack } from "expo-router";

export default function JourneyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
       <Stack.Screen name="creditCard/selectCreditCard" />
       <Stack.Screen name="creditCard/selectRequiredAmount" />
       <Stack.Screen name="creditCard/personalDetail/borrowerDetails" />
       <Stack.Screen name="creditCard/personalDetail/coBorrowerDetails" />
      <Stack.Screen name="creditCard/incomeDetail/borrower" />
      <Stack.Screen name="creditCard/incomeDetail/coBorrower" />
     
    </Stack>
  );
}
