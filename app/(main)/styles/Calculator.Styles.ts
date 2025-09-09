import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topPurple: {
    height: 8,
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
  },
  greetingSmall: {
    fontSize: 13,
  },
  greetingName: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },

  emiCard: {
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
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  emiDesc: {
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
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  inputCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
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

  resultCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 18,
  },
  resultLabel: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "600",
  },
  resultAmount: {
    fontSize: 18,
    fontWeight: "400",
  },
  resultUnit: {
    fontSize: 16,
    fontWeight: "500",
  },

  backButton: {
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  backButtonText: {
    fontWeight: "800",
    fontSize: 16,
  },
});


