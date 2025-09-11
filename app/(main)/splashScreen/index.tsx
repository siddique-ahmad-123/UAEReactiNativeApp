import React, { useEffect, useRef } from "react";
import { View, ImageBackground, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";

const SplashScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade In & Out Animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3s
    const timer = setTimeout(() => {
      const isRegistered = false; //  replace with AsyncStorage / API check

      if (isRegistered) {
        router.replace("/NavScreen");
      } else {
        router.replace("/onboarding");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/images/splashBg.png")} 
      style={StyleSheet.absoluteFillObject}  // 
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.Image
          source={require("../../../assets/images/newgenLogo.png")} 
          style={[styles.logo, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
