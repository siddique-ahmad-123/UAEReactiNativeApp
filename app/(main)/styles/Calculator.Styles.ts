import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topPurple: {
    height: 8,
    backgroundColor: "#4B006E",
  },

  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
  },
  greetingSmall: {
    color: "#666",
    fontSize: 13,
  },
  greetingName: {
    color: "#2d2d2d",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },

  emiCard: {
    backgroundColor: "#4B006E",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 16,
    paddingRight: 26,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 12,
  },
  emiTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  emiDesc: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
    opacity: 0.95,
  },
  emiImage: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  inputCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 18,
    color: "#3F1956",
    fontWeight: "500",
  },

  amountInputWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#FEE9C3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedChipText: {
    color: "#C47D00",
    fontWeight: "700",
    fontSize: 12,
  },
  selectedChipUnit: {
    color: "#C47D00",
    fontSize: 11,
    marginLeft: 4,
  },

  amountInputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 110,
    justifyContent: "center",
  },
  amountInput: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    padding: 0,
    marginRight: 6,
  },
  amountUnit: {
    fontSize: 12,
    color: "#666",
  },

  amountInputBoxSmall: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: "center",
  },
  amountInputSmall: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    padding: 0,
    marginRight: 6,
    width: 36,
    textAlign: "center",
  },
  amountUnitSmall: {
    fontSize: 12,
    color: "#666",
  },

  sliderWrapper: {
    height: 36,
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 6,
    position: "relative",
  },
  trackBackground: {
    height: 8,
    backgroundColor: "#F0EDED",
    borderRadius: 12,
  },
  trackActive: {
    position: "absolute",
    left: 0,
    height: 8,
    backgroundColor: "#8924C6",
    borderRadius: 12,
  },

  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rangeText: {
    fontSize: 16,
    color: "#333333",
  },

  resultCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    marginBottom: 18,
  },
  resultLabel: {
    color: "#3F1956",
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "600",
  },
  resultAmount: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
  },
  resultUnit: {
    fontSize: 16,
    color: "#B5B5B5",
    fontWeight: "500",
  },

  backButton: {
    backgroundColor: "#FECB26",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#3F1956",
    fontWeight: "800",
    fontSize: 16,
  },
});


