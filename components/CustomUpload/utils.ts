import {
  fontSize,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacingVertical.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: radius.lg,
    // backgroundColor: "#fff",
    width: "90%",
  },
  label: {
    fontSize: fontSize.md,
    // color: "#333",
  },
});
