import { fontSize, radius, spacing, spacingVertical } from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bannerContainer: {
    // width: "100%",
    borderRadius: radius.lg,
    overflow: "hidden",
    marginHorizontal: spacing.md,
    marginVertical: spacingVertical.md,
  },
  bannerImage: {
    borderRadius: radius.lg,
  },
  overlayBox: {
    backgroundColor: "#3F1956",
    paddingVertical: spacingVertical.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    margin: spacing.md,
    maxWidth: "50%",
    marginBottom: spacingVertical.md,
  },
  messageText: {
    fontSize: fontSize.md,
    color: "#fff",
    fontWeight: "600",
    marginBottom: spacingVertical.md,
  },
});
