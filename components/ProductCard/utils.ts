import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: spacing.xxxxxl,
    height: spacingVertical.xxxxl,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: radius.lg,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    position: "absolute",
    bottom: spacing.lg,
    left: spacing.sm,
    zIndex:20
  },
});
