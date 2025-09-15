import { radius, spacing } from "@/constants/Metrics";
import React from "react";
import { StyleSheet } from "react-native";

export const localStyles = StyleSheet.create({
  text: { fontSize: 22, fontWeight: "bold" },
    content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
      flex: 1,
          borderTopLeftRadius: radius.pill,
          borderTopRightRadius: radius.pill,
          paddingTop: spacing.xxl,
          paddingHorizontal: spacing.md,
    },
});

