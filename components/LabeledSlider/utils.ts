import { fontSize, radius, spacingX, spacingY } from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: spacingX._15,
    borderRadius: radius.lg,
    marginVertical: spacingY._10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: spacingY._10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacingY._7,
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
    paddingHorizontal: spacingX._10,
    borderRadius: radius.md,
  },
  input: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
    minWidth: spacingX._60, // so it scales with design
    textAlign: "right",
    paddingVertical: spacingY._5,
  },
  unit: {
    fontSize: fontSize.xs,
    marginLeft: spacingX._5,
    color: "#666",
  },
  slider: {
    width: "100%",
    marginTop: -spacingY._10,
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacingY._5,
  },
  rangeText: {
    fontSize: fontSize.xs,
    color: "#444",
  },
});
