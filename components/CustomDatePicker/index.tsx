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
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "styled-components/native";

interface CustomDatePickerProps {
  control?: any; // react-hook-form control (optional)
  name?: string; // only required if using control
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  variant?: "full" | "half";
  mandatory?: boolean;
  onChangePicker?: (date: Date | null) => void;
}

const CustomDatePicker = ({
  control,
  name,
  label,
  placeholder = "Select a date...",
  minDate,
  maxDate,
  variant = "full",
  mandatory = false,
  onChangePicker,
}: CustomDatePickerProps) => {
  const [localDate, setLocalDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const theme = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case "half":
        return styles.half;
      case "full":
      default:
        return styles.full;
    }
  };

  const handleConfirm = (date: Date, onChange?: (d: Date) => void) => {
    const normalizedDate = new Date(date); // always convert
    onChange ? onChange(normalizedDate) : setLocalDate(normalizedDate);
    setDatePickerVisibility(false);
    onChangePicker?.(normalizedDate);
  };

  const styles = StyleSheet.create({
    container: {
      borderWidth: borderWidth.normal,
      borderRadius: radius.md,
      paddingVertical: 12,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.colors.background,
    },
    full: { width: width.full },
    half: { width: width.md },
    labelContainer: {
      position: "absolute",
      top: -spacingVertical.semi,
      left: spacing.md,
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.xs,
    },
    label: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
    },
    labelLine: {
      // marginLeft: spacing.md,
    },
    inputBox: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
      alignItems: "center",
      height: spacingVertical.lg,
    },
    placeholderText: { fontSize: fontSize.sm },
    dateText: { fontSize: fontSize.md },
    errorText: {
      color: theme.colors.errorTextColor,
      fontSize: fontSize.xs,
      marginTop: spacingVertical.xs,
      marginLeft: spacing.sm,
    },
  });

  const renderPicker = (
    value: Date | null,
    onChange?: (d: Date) => void,
    error?: any
  ) => (
    <View>
      <View
        style={[
          styles.container,
          getVariantStyle(),
          {
            borderColor: error
              ? theme.colors.errorTextColor
              : theme.colors.inputFieldBorder,
          },
        ]}
      >
        {/* Label */}
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: theme.colors.primaryColor }]}>
            {label}
            {mandatory && (
              <Text style={{ color: theme.colors.errorTextColor }}> *</Text>
            )}
          </Text>
          <View
            style={[
              styles.labelLine,
              { backgroundColor: theme.colors.inputFieldBorder },
            ]}
          />
        </View>

        {/* Touchable Input */}
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text
            style={
              value
                ? [styles.dateText, { color: theme.colors.textPrimary }]
                : [
                    styles.placeholderText,
                    { color: theme.colors.placeholderColor },
                  ]
            }
          >
            {value ? new Date(value).toLocaleDateString("en-GB") : placeholder}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={fontSize.lg}
            color={theme.colors.primaryColor}
          />
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={minDate}
          maximumDate={maxDate}
          onConfirm={(date) => handleConfirm(date, onChange)}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );

  // Controlled via react-hook-form
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) =>
          renderPicker(value ?? null, onChange, error)
        }
      />
    );
  }

  // Uncontrolled fallback
  return renderPicker(localDate, undefined, undefined);
};

export default CustomDatePicker;
