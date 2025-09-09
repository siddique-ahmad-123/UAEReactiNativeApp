import {
  borderWidth,
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
  width,
} from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacingVertical.lg,
    paddingHorizontal: spacing.md,
    borderWidth: borderWidth.thin,
    borderRadius: radius.lg,
    width: width.full,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
  },
});
