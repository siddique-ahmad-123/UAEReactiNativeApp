import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./utils";

interface CustomUploadProps {
  label: string;
}

const CustomUpload = ({ label }: CustomUploadProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Feather name="upload" size={24} color="#4B0082" />
    </TouchableOpacity>
  );
};

export default CustomUpload;
