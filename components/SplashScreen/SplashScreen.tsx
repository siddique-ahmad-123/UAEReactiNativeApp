// SplashScreen.tsx
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ripple } from "./ripple";
import { useRouter } from "expo-router";
import { getUser } from "@/utils/storage";

export default function SplashScreen() {
  const router = useRouter();

//   useEffect(() => {
//   const checkUser = async () => {
//     try {
//       const user = await getUser();
//       console.log("👤 User from storage:", user); 

//       setTimeout(() => {
//         if (user) {
//           router.replace("/(main)/home");
//         } else {
//           router.replace("/(main)/onboarding");
//         }
//       }, 1500);
//     } catch (err) {
//       console.error("❌ Error checking user:", err);
//       router.replace("/(main)/onboarding");
//     }
//   };

//   checkUser();
// }, [router]);


  return (
    <View style={styles.container}>
      {/* Multiple ripples with delays for wave effect */}
      <Ripple delay={0} />
      <Ripple delay={700} />
      <Ripple delay={1400} />

      {/* Your logo in center */}
      <Image
        source={require("../../assets/Logo-High_front.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C1053",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
