  
import { StyleSheet } from "react-native";


export const gstyles = StyleSheet.create({
 
  row: {
  flexDirection: "row",
  justifyContent: "center", // keeps them grouped in center
  alignItems: "center",
  gap: 15
},
checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    gap: 8,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: "#3F1956",
  },
});
