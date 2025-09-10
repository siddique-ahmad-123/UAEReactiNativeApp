import { StyleSheet } from "react-native";

export const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4B006E", // Purple fills behind header
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 50,
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
    fontWeight: "700",
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
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  value: {
    fontSize: 14,
    marginTop: 10,
  },
});
