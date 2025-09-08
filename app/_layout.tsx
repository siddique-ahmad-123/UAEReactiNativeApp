import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/karbon-regular-webfont.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(main)/home">
        <Stack.Screen name="(auth)/otp" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/home" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/calculator" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/notification" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/NeedHelp" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/menu" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
