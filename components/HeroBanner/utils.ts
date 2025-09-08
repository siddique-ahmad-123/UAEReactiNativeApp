import { fontSize, radius, spacingX, spacingY } from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bannerContainer: {
    // width: "100%",
    borderRadius: radius.lg,
    overflow: "hidden",
    marginHorizontal: spacingX._15,
    marginVertical: spacingY._15,
  },
  bannerImage: {
    borderRadius: radius.lg,
  },
  overlayBox: {
    backgroundColor: "#3F1956",
    paddingVertical: spacingY._15,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.lg,
    margin: spacingX._15,
    maxWidth: "50%",
    marginBottom: spacingY._30,
  },
  messageText: {
    fontSize: fontSize.md,
    color: "#fff",
    fontWeight: "600",
    marginBottom: spacingY._20,
  },
});
