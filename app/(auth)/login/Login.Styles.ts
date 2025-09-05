import { StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  headerBackground: {
    width: "110%",
    height: 300,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  imageStyle: {
    opacity: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  logo: {
    position: "absolute",
    width: 230,
    height: 57,
    top: 56,
    left: 171,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  cornerImage: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 60,
    height: 60,
  },

  cornerText: {
    position: "absolute",
    bottom: 80,
    left: 36,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  cornerText2: {
    position: "absolute",
    bottom: 36,
    left: 26,
    fontSize: 22,
    color: "#fff",
  },

  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    padding: 20,
  },

  forgotPassword: { fontSize: 14, color: colors.text },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
