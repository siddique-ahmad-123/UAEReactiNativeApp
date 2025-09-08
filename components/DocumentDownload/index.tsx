import { fontSize, radius, spacing, spacingVertical } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons"; // for the download icon
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface DocumentDownloadProps {
  documentName: string;
}

const DocumentDownload = ({ documentName }: DocumentDownloadProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{documentName}</Text>
      <Ionicons name="arrow-down-outline" size={20} color="#3F1956" />
    </TouchableOpacity>
  );
};

export default DocumentDownload;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3E6FC",
    paddingVertical: spacingVertical.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginVertical: spacingVertical.md,
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
  },
});
