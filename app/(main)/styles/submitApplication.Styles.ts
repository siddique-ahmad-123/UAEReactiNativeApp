import { useTheme } from "styled-components/native";
import React from "react";
import { StyleSheet } from "react-native";
import { fontSize, fontWeight, radius, spacing } from "@/constants/Metrics";

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
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
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

  centerBox: {
    alignItems: "center",
    marginTop: 30,
  },
  successImage: {
    width: spacing.xxxli,
    height: spacing.xxxli,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: 15,
  },

  textbox: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    textAlign: "center",
    marginTop: 6,
  },
  textbox2: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginTop: 15,
  },
  image:{
    alignItems: "center",
     marginTop: 30
  },
  text:{
    fontSize: fontSize.sm,
     fontWeight: fontWeight.normal
  },
  imageSpex:{
    width: spacing.xxxxxxl,
    height: spacing.xxxxxl
  }
});
