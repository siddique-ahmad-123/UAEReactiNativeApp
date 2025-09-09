import { fontSize, radius, spacing, spacingVertical } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface CustomInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "currency" | "password";
  variant?: "full" | "half";
  mandatory?: boolean;
  secureTextEntry?:boolean
}

const CustomInput = ({
  label,
  placeholder,
  type = "text",
  variant = "full",
  mandatory = false,
}: CustomInputProps) => {
  const [value, setValue] = useState("");
  const [secure, setSecure] = useState(false);

  const getVariantStyle = () => {
    switch (variant) {
      case "half":
        return styles.half;
      case "full":
      default:
        return styles.full;
    }
  };

  return (
    <View style={[styles.container, getVariantStyle()]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {mandatory && <Text style={{ color: "red" }}> *</Text>}
        </Text>
        <View style={styles.labelLine} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, type === "password" && { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={setValue}
          secureTextEntry={secure}
          keyboardType={
            type === "email"
              ? "email-address"
              : type === "number" || type === "currency"
              ? "numeric"
              : "default"
          }
        />

        {type === "password" && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye" : "eye-off"}
              size={fontSize.lg}
              color="#555"
              style={{ marginLeft: spacing.md }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: "#DEDEDE",
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacingVertical.md,
    marginVertical: spacingVertical.md,
    backgroundColor: "#fff",
  },
  full: {
    width: "100%",
  },
  half: {
    width: "50%",
  },
  labelContainer: {
    position: "absolute",
    top: -spacingVertical.md,
    left: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
  },
  labelLine: {
    height: 1.5,
    backgroundColor: "#ccc",
    marginLeft: spacing.md,
  },
  input: {
    fontSize: fontSize.md,
    paddingTop: spacingVertical.md,
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    paddingHorizontal: spacing.md,
  },
});
