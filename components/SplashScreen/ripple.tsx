// Ripple.tsx
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { MotiView } from "moti";

const { width, height } = Dimensions.get("window");

export const Ripple = ({ delay }: { delay: number }) => {
  const size = width * 0.9; // big enough to cover

  return (
    <MotiView
      from={{ opacity: 0.6, scale: 0.1 }} 
      animate={{ opacity: 0, scale: 1 }}
      transition={{
        type: "timing",
        duration: 4000, 
        delay,
        repeat: Infinity,
      }}
      style={[
        styles.ripple,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ripple: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "#FECB26",
    alignSelf: "center",
  },
});
