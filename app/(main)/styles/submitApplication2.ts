import { useTheme } from "styled-components/native";
import React from "react";
import { StyleSheet } from "react-native";
import { radius, spacing } from "@/constants/Metrics";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Purple fills behind header
  },
  header: {
   paddingHorizontal: spacing.md,
       paddingTop: spacing.xxxl,
       paddingBottom: spacing.xxl,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
  },
  closeButton: {
    fontSize: 20,
  },
  subHeader: {
    fontSize: 12,
    marginTop: 4,
  },
  container: {
   flex: 1,
       borderTopLeftRadius: radius.pill,
       borderTopRightRadius: radius.pill,
       paddingTop: spacing.xxl,
       paddingHorizontal: spacing.md,
  },
  image: {
    alignItems: "center",
    marginTop: 30,
  },
  textbox2: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
  },
  textbox3: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  linkTextView: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 120,
  },
  linktext: { alignItems: "center", fontSize: 18, fontWeight: "700" },
});
