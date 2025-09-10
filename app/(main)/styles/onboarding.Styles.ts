  
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width:422,
    height:352
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 208,
    height: 82,
    alignSelf: "flex-end",
    marginTop: 25.25,
    marginLeft: 222,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    fontFamily:"LatoBold"
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily:"LatoRegular"
  },
  pagination: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
},
dot: {
  height: 11,
  width:11,
  borderRadius: 5,
  marginHorizontal: 5,
  color:"#E8D7F2"
},
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    padding: 20,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#5B2E91",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelText: {
    color: "#5B2E91",
    fontWeight: "600",
  },
  startButton: {
    backgroundColor: "#FFD02C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startText: {
    color: "#000",
    fontWeight: "700",
  },
  row: {
  flexDirection: "row",
  justifyContent: "center", // keeps them grouped in center
  alignItems: "center",
  gap: 15
}
});
