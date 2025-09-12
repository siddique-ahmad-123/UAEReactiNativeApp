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
  overlay: {
    ...StyleSheet.absoluteFillObject, // fill the parent
    backgroundColor: "#4b2e5e2f", // semi-transparent black
  },
  title: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    position: "absolute",
    bottom: spacing.md,
    right: spacing.sm,
    zIndex:20
  },
});
