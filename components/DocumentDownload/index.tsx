import {
  fontSize,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons"; // for the download icon
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

interface DocumentDownloadProps {
  documentName: string;
}

const DocumentDownload = ({ documentName }: DocumentDownloadProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.primaryLightColor }]}
    >
      <Text style={[styles.text, { color: theme.colors.primaryColor }]}>
        {documentName}
      </Text>
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
    paddingVertical: spacingVertical.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginVertical: spacingVertical.md,
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
});
