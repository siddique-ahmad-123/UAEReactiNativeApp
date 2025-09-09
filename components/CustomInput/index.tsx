import {
  fontSize,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";

interface CustomInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "currency" | "password";
  variant?: "full" | "half";
  mandatory?: boolean;
  secureTextEntry?: boolean;
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

  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.inputFieldBorder },
        { backgroundColor: theme.colors.background },
        getVariantStyle(),
      ]}
    >
      <View
        style={[
          styles.labelContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.label, { color: theme.colors.primaryColor }]}>
          {label}
          {mandatory && <Text style={{ color: "red" }}> *</Text>}
        </Text>
        <View
          style={[
            styles.labelLine,
            { backgroundColor: theme.colors.background },
          ]}
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            { color: theme.colors.textPrimary },
            type === "password" && { flex: 1 },
          ]}
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
    // borderColor: "#DEDEDE",
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacingVertical.md,
    marginVertical: spacingVertical.md,
    // backgroundColor: "#fff",
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
    // backgroundColor: "#fff",
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    // color: "#3F1956",
  },
  labelLine: {
    height: 1.5,
    // backgroundColor: "#ccc",
    marginLeft: spacing.md,
  },
  input: {
    fontSize: fontSize.md,
    paddingTop: spacingVertical.md,
    // color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    paddingHorizontal: spacing.md,
  },
});
