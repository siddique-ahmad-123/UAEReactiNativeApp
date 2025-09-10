import { useTheme } from "styled-components/native";
import React from "react";
import { StyleSheet } from "react-native";

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
});
