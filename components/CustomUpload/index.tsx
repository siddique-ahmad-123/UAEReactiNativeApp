import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";
import { spacing } from "@/constants/Metrics";

interface CustomUploadProps {
  label: string;
}

const CustomUpload = ({ label }: CustomUploadProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: theme.colors.inputFieldBorder },
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.label, { color: theme.colors.primaryColor }]}>
        {label}
      </Text>
      <Feather name="upload" size={spacing.lg} color={theme.colors.primaryColor} />
    </TouchableOpacity>
  );
};

export default CustomUpload;
