// SplashScreen.tsx
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ripple } from "./ripple";


export default function SplashScreen() {
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
