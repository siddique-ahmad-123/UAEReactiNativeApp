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
    // padding: spacing.sm,
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
    fontWeight: fontWeight.semiBold,
    // color: "#fff",
    position: "absolute",
    bottom: spacing.lg,
    left: spacing.sm,
  },
});
