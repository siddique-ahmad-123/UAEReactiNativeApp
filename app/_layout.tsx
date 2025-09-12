import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ScreenWrapper from "@/components/ScreenWrapper";
import { toastConfig } from "@/components/Toast/toastConfig";
import { AppProvider } from "@/theme/AppProvider";
import { initSyncListener } from "@/utils/networkListener";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initSyncListener();
    setTimeout(() => setLoading(false), 4000); // 4s splash
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/karbon-regular-webfont.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });
  if (loading) return <SplashScreen />;
  if (!loaded) return null;

  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1, }}> 
        <ScreenWrapper>
          <Stack initialRouteName="(main)">
            {/* <Stack.Screen name="(test)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="(journey)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <Toast config={toastConfig} />
        </ScreenWrapper>
      </GestureHandlerRootView>
    </AppProvider>
  );
}
