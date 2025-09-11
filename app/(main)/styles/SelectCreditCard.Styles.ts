import { radius, spacing } from "@/constants/Metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.md,
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
  subHeader: {
    fontSize: 12,
    marginTop: 4,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
            borderTopLeftRadius: radius.pill,
            borderTopRightRadius: radius.pill,
            paddingTop: spacing.xxl,
            paddingHorizontal: spacing.md,
  },

  /** Card styles */
  card: {
    width: 332,
    height: 568,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  cardImage: {
    width: "80%",
    height: 150,
    marginBottom: 12,
  },
   closeButton: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 16,
  },
  buttonRow: {
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
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
