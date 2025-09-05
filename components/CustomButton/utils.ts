import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  // 🔹 Container Styles
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  // 🔹 Text Styles
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#666",
  },
 

  // 🔹 Button Styles
 button1: {
    backgroundColor: "#FECB26",
    width: 189,
    height: 58,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F1956",
  },

   button2: {
    backgroundColor: "#FFFFFF",
    width: 174,
    height: 58,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
   outlinedButton: {
    borderWidth: 1,
    borderColor: "blue",
    backgroundColor: "#FFFFFF",
    width: 174,
    height: 58,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  outlinedText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#3F1956",
  },

  // 🔹 App Bar Customization (Optional)
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default globalStyles;
