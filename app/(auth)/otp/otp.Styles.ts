import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white},
  headerBackground: {
    width: "110%",
    height: 300,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageStyle: {
    opacity: 1,
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
  cornerText: {
    position: "absolute",
    bottom: 100,
    left: 36,
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cornerText2: {
    position: "absolute",
    bottom: 66,
    left: 36,
    fontSize: 22,
    color: "#FFFFFF",
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    padding: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3F1956",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#B8B8B8",
    textAlign: "center",
    marginBottom: 20,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 319,
    height: 62,
    marginVertical: 20,
  },
  otpBox: {
    width: 61,
    height: 62,
    borderRadius: 19,
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 40,
    zIndex: 10, // ✅ ensures it’s always on top
  },
  backArrow: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  resendLabel: { color: "#B8B8B8", marginTop: 10 },
  resendText: { color: "#3F1956", fontWeight: "700", marginTop: 5 },
  timer: { marginTop: 5, color: "#B8B8B8" },
});