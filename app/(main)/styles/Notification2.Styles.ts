
import { spacing, spacingExtra, spacingVertical } from "@/constants/Metrics";
import { scale } from "@/utils/styling";
import React from "react";
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
  closeButton: {
    fontSize: 20,
    color: "#fff",
  },
  subHeader: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  contentBox: {
    backgroundColor: "#4B006E",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "#FFD23F", // Yellow
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: "auto",
    marginBottom: 30,
  },
  backButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#4B006E",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#3B006A", // purple
    borderRadius: 10,
    padding: 16,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  detail: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 2,
  },
  button: {
    backgroundColor: "#FECB26", // yellow
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2C004D", // dark purple text
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
    top: -10,        // moves it slightly above the border
    left: 12,
    fontSize: 13,
    fontWeight: "600", // hides the border line behind text
    paddingHorizontal: 4,    // small padding so background covers neatly
  },
  value: {
    fontSize: 14,
    marginTop: 10, // pushes text down so it doesn’t overlap with label
  },
 editableBox: {
  borderWidth: 1,
  borderRadius: 8,
  padding: 12,
  fontSize: 14,
  color: "#333",
  marginTop: 6,
  minHeight: 60,
  textAlignVertical: "top", // keeps text at top
},
});


