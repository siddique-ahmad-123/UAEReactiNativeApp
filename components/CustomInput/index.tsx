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
  type?: "text" | "email" | "number" | "currency" | "password" | "textarea";
  variant?: "full" | "half";
  required?: boolean;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  value?: string;
  /**
   * external onChange callback you can pass from parent.
   * Receives (rawValue, formattedValue?) where formattedValue is provided when formatWithCommas = true
   */
  onChangeText?: (v: string, formatted?: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  maxLength?: number;
  editable?: boolean;
  formatWithCommas?: boolean; // 🔹 new prop
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  variant = "full",
  required = false,
  numberOfLines = 4,
  value,
  onChangeText,
  keyboardType,
  maxLength,
  editable,
  formatWithCommas = false, // 🔹 default false
}: CustomInputProps) => {
  const [secure, setSecure] = useState(type === "password");
  const [localValue, setLocalValue] = useState(""); // for uncontrolled mode
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderWidth: borderWidth.normal,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 4,
    },
    full: {
      width: width.full,
    },
    half: {
      width: width.md,
    },
    labelContainer: {
      position: "absolute",
      top: -spacingVertical.semi,
      left: spacing.md,
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      paddingHorizontal: spacing.xs,
    },
    label: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
    },
    labelLine: {
      // marginLeft: spacing.md,
    },
    input: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.normal,
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
    textArea: {
      textAlignVertical: "top",
      minHeight: numberOfLines * 22,
      paddingTop: spacing.sm,
    },
    disabled: {
      backgroundColor: theme.colors.borderColor,
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
  const getDisableStyle = () => {
    switch (editable) {
      case false:
        return styles.disabled;
    }
  };

  // —— Replace existing formatNumber with this ——
  const formatNumber = (text: string | number | null | undefined) => {
    // coerce everything to string so .replace won't crash
    const str = text == null ? "" : String(text);
    const rawValue = str.replace(/,/g, "");
    if (rawValue === "") return "";
    // allow numeric strings only
    if (!isNaN(Number(rawValue))) {
      return Number(rawValue).toLocaleString("en-US");
    }
    return str;
  };

  // —— Replace existing handleTextChange with this ——
  const handleTextChange = (
    text: string,
    onChange: (v: string) => void,
    externalOnChange?: (v: string, formatted?: string) => void
  ) => {
    if ((type === "number" || type === "currency") && formatWithCommas) {
      const rawValue = String(text).replace(/,/g, "");
      const formatted = formatNumber(text); // safe now
      setLocalValue(formatted);
      // keep form state numeric-friendly: pass raw string (you can change to Number(rawValue) if you prefer)
      onChange(rawValue);
      if (externalOnChange) externalOnChange(rawValue, formatted);
    } else {
      const str = String(text);
      setLocalValue(str);
      onChange(str);
      if (externalOnChange) externalOnChange(str);
    }
  };

  // 🔹 Shared render block (added externalOnChange param)
  const renderInput = (
    value: string,
    onChange: (v: string) => void,
    onBlur?: () => void,
    error?: any,
    externalOnChange?: (v: string, formatted?: string) => void
  ) => {
    const displayValue =
      (type === "number" || type === "currency") && formatWithCommas
        ? formatNumber(value ?? localValue)
        : value ?? localValue;

    return (
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
              {required && <Text style={{ color: "red" }}> *</Text>}
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
                { flex: type === "textarea" ? 0 : 1 },
                type === "textarea" && styles.textArea,
              ]}
              placeholder={placeholder}
              placeholderTextColor="#aaa"
              value={displayValue}
              onChangeText={(text) =>
                handleTextChange(text, onChange, externalOnChange)
              }
              onBlur={onBlur}
              secureTextEntry={type === "password" ? secure : false}
              multiline={type === "textarea"}
              numberOfLines={type === "textarea" ? numberOfLines : 1}
              keyboardType={
                keyboardType ??
                (type === "email"
                  ? "email-address"
                  : type === "number" || type === "currency"
                  ? "numeric"
                  : "default")
              }
              maxLength={maxLength}
              editable={editable !== false}
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
  };

  // 🔹 If control is passed → use Controller (react-hook-form)
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={required ? { required: `${label} is required` } : undefined}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) =>
          // pass external onChangeText so it is fired as well
          renderInput(value ?? "", onChange, onBlur, error, onChangeText)
        }
      />
    );
  }

  // 🔹 If no control → fallback to uncontrolled TextInput
  // here: onChange is local setLocalValue, externalOnChange is the prop onChangeText
  return renderInput(
    value ?? localValue,
    setLocalValue,
    undefined,
    undefined,
    onChangeText
  );
};

export default CustomInput;
