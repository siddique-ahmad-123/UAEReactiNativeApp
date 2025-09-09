import {
  fontSize,
  radius,
  spacing,
  spacingVertical
} from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: spacing.xxl,
    height: spacingVertical.xxl,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.sm,
  },
  imageStyle: {
    borderRadius: radius.lg,
  },
  overlay: {
    // if you want to restore these, convert like:
    // bottom: -spacingExtra.s10,
    // left: -spacingExtra.s10,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    // color: "#fff",
    position: "absolute",
    bottom: spacing.lg,
    left: spacing.sm,
  },
});
