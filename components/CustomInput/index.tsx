import {
  borderWidth,
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
  width,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";

interface CustomInputProps {
  control?: any; // react-hook-form control (optional)
  name?: string; // only required if using control
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "currency" | "password";
  variant?: "full" | "half";
  mandatory?: boolean;
  secureTextEntry?:boolean
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  variant = "full",
  mandatory = false,
}: CustomInputProps) => {
  const [secure, setSecure] = useState(type === "password");
  const [localValue, setLocalValue] = useState(""); // for uncontrolled mode
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderWidth: borderWidth.normal,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacingVertical.xs,
      marginVertical: spacingVertical.md,
    },
    full: {
      width: width.full,
    },
    half: {
      width: width.md,
    },
    labelContainer: {
      position: "absolute",
      top: -spacingVertical.sm,
      left: spacing.md,
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      paddingHorizontal: spacing.xs,
    },
    label: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semiBold,
    },
    labelLine: {
      // height: 1.5,
      marginLeft: spacing.md,
    },
    input: {
      fontSize: fontSize.md,
      paddingTop: spacingVertical.md,
    },
    inputRow: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
    },
    errorText: {
      color: "red",
      fontSize: fontSize.xs,
      marginTop: spacingVertical.xs,
      marginLeft: spacing.sm,
    },
  });

  const getVariantStyle = () => {
    switch (variant) {
      case "half":
        return styles.half;
      case "full":
      default:
        return styles.full;
    }
  };

  // 🔹 Shared render block (used for both controlled & uncontrolled)
  const renderInput = (
    value: string,
    onChange: (v: string) => void,
    onBlur?: () => void,
    error?: any
  ) => (
    <View>
      <View
        style={[
          styles.container,
          getVariantStyle(),
          {
            borderColor: error ? "red" : theme.colors.inputFieldBorder,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        {/* Label */}
        <View
          pointerEvents="none"
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

        {/* Input Row */}
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              { color: theme.colors.textPrimary },
              { flex: 1 },
            ]}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
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
                name={secure ? "eye-off" : "eye"}
                size={fontSize.lg}
                color="#555"
                style={{ marginLeft: spacing.md }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );

  // 🔹 If control is passed → use Controller (react-hook-form)
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => renderInput(value ?? "", onChange, onBlur, error)}
      />
    );
  }

  // 🔹 If no control → fallback to uncontrolled TextInput
  return renderInput(localValue, setLocalValue, undefined, undefined);
};

export default CustomInput;
