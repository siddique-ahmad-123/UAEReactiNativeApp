import {
  fontSize,
  radius,
  spacing,
  spacingExtra,
  spacingVertical,
} from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: spacing.md, // was spacingX._15
    borderRadius: radius.lg, // already consistent
    marginVertical: spacingVertical.sm, // was spacingY._10
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: spacingVertical.sm, // was spacingY._10
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacingExtra.s7, // was spacingY._7
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9FB",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: spacing.sm, // was spacingX._10
    borderRadius: radius.md,
  },
  input: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
    minWidth: spacingExtra.s60, // was spacingX._60
    textAlign: "right",
    paddingVertical: spacingExtra.s5, // was spacingY._5
  },
  unit: {
    fontSize: fontSize.xs,
    marginLeft: spacingExtra.s5, // was spacingX._5
    color: "#666",
  },
  slider: {
    width: "100%",
    marginTop: -spacingVertical.sm, // was -spacingY._10
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacingExtra.s5, // was spacingY._5
  },
  rangeText: {
    fontSize: fontSize.xs,
    color: "#444",
  },
});
