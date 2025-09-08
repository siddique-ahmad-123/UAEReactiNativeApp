import { fontSize, radius, spacingX, spacingY } from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacingY._20,
    paddingHorizontal: spacingX._15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: radius._12,
    backgroundColor: "#fff",
    width: "90%"
  },
  label: {
    fontSize: fontSize.md,
    color: "#333",
  },
});
