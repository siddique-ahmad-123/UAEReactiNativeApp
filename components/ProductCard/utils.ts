import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    // position: "absolute",
    // bottom: -10,
    // left: -10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    position: "absolute",
    bottom: 20,
    left: 15,
  },
});
