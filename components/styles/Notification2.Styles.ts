import { fontSize, fontWeight, spacing } from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
        paddingTop: spacing.xxxl,
        paddingBottom: spacing.xxl,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  title2: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 180,
    padding: 12,
    marginTop: 20,
    position: "relative",
  },
  label: {
    position: "absolute",
    top: -10,
    left: 12,
    fontSize: 13,
    fontWeight: fontWeight.medium,
    paddingHorizontal: 4,
  },
  value: {
    fontSize: 14,
    marginTop: 10,
  },
});
