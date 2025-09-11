import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
  width,
} from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    borderRadius: radius.md,
    padding: spacing.md,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  cardImage: {
    width: width.full,
    height: 200,
    marginBottom: spacingVertical.md,
  },
  closeButton: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacingVertical.md,
  },
  cardDescription: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    textAlign: "center",
    marginBottom: spacingVertical.sm,
  },
  cardDescription2: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    textAlign: "center",
    marginBottom: spacingVertical.xs,
  },
  buttonRow: {
    marginTop: spacingVertical.md,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  knowMoreBtn: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
  },
  knowMoreText: {
    fontWeight: "bold",
  },
  applyBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  applyText: {
    fontWeight: "bold",
  },

  /** Pagination Dots */
  pagination: {
    position:"absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: -300,
    left:"50%",
    bottom:"32%"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
  },
});
