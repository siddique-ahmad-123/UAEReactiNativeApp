import { useTheme } from "styled-components/native";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Purple fills behind header
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
    fontWeight: 700,
  },
  closeButton: {
    fontSize: 20,
  },
  subHeader: {
    fontSize: 12,
    marginTop: 4,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  image: {
    alignItems: "center",
    marginTop: 30,
  },
  textbox2: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
  },
  textbox3: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  linkTextView: {
    alignItems: "center",
    marginTop: 20,
  },
  linktext: { alignItems: "center", fontSize: 16, fontWeight: "700",marginBottom:50 },
    row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
