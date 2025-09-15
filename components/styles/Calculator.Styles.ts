import { borderWidth, fontSize, fontWeight, radius, spacing, spacingVertical } from "@/constants/Metrics";
import React from "react";
import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topPurple: {
    height: spacingVertical.sm,
  },

  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxli,
    paddingBottom: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
  },
  greetingSmall: {
    fontSize: fontSize.xs,
  },
  greetingName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginTop: 2,
  },

  emiCard: {
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
    paddingRight: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  emiTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.extraBold,
    marginBottom: spacing.xs,
  },
  emiDesc: {
    fontSize: fontSize.sm,
    lineHeight: 18,
    opacity: 0.95,
  },
  emiImage: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },

  container: {
    flex: 1,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },

  inputCard: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: borderWidth.thin,
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  inputCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  resultCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: borderWidth.thin,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  resultLabel: {
    fontSize: fontSize.lg,
    marginBottom: 6,
    fontWeight: fontWeight.semiBold,
  },
  resultAmount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
  },
  resultUnit: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },

  backButton: {
    paddingVertical: 14,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
    alignItems: "center",
  },
  backButtonText: {
    fontWeight: fontWeight.extraBold,
    fontSize: fontSize.md,
  },
});
