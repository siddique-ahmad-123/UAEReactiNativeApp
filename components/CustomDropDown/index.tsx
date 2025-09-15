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
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { useTheme } from "styled-components/native";

interface CustomDropDownProps {
  label: string;
  placeholder?: string;
  data: { label: string; value: string }[];
  type?: "singleSelect" | "multiSelect";
  variant?: "full" | "half";
  mandatory?: boolean;
  control?: any; // react-hook-form control
  name?: string; // required if using control
  disable?:boolean;
}

const CustomDropDown = ({
  label,
  placeholder = "Select...",
  data,
  type = "singleSelect",
  variant = "full",
  mandatory = false,
  control,
  name,
  disable = false,
}: CustomDropDownProps) => {
  const [localValue, setLocalValue] = useState<string | string[]>(
    type === "multiSelect" ? [] : ""
  );
  const theme = useTheme();

  const getVariantStyle = () =>
    variant === "half" ? styles.half : styles.full;

  const styles = StyleSheet.create({
    container: {
      borderWidth: borderWidth.normal,
      borderRadius: radius.md,
      paddingVertical: spacingVertical.semi,
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
      paddingHorizontal: spacing.xs,
    },
    label: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
    },
    labelLine: { height: 1.5, marginLeft: spacing.md },
    dropdown: { height: spacingVertical.lg },
    placeholderStyle: { fontSize: fontSize.md, color: "#999" },
    selectedTextStyle: { fontSize: fontSize.md },
    iconStyle: { marginLeft: spacing.md },
    selectedStyle: {
      borderRadius: radius.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacingVertical.md,
      margin: spacing.md,
    },
    errorText: {
      color: theme.colors.errorTextColor,
      fontSize: fontSize.xs,
      marginTop: spacingVertical.xs,
      marginLeft: spacing.sm,
    },
  });

  const renderDropdown = (
    value: string | string[],
    onChange?: (val: any) => void,
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
        <View
          style={[
            styles.labelContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.label, { color: theme.colors.primaryColor }]}>
            {label}{" "}
            {mandatory && (
              <Text style={{ color: theme.colors.errorTextColor }}> *</Text>
            )}
          </Text>
          <View
            style={[
              styles.labelLine,
              { backgroundColor: theme.colors.background },
            ]}
          />
        </View>

        {/* Dropdown */}
        {type === "singleSelect" ? (
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[
              styles.selectedTextStyle,
              { color: theme.colors.textPrimary },
            ]}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value}
            disable={disable}
            onChange={(item) =>
              onChange ? onChange(item.value) : setLocalValue(item.value)
            }
            renderRightIcon={() => (
              <Ionicons
                name="chevron-down"
                size={fontSize.lg}
                color={theme.colors.primaryColor}
              />
            )}
          />
        ) : (
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[
              styles.selectedTextStyle,
              { color: theme.colors.textPrimary },
            ]}
            iconStyle={styles.iconStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value as string[]}
            onChange={(items) =>
              onChange ? onChange(items) : setLocalValue(items)
            }
            renderRightIcon={() => (
              <Ionicons
                name="chevron-down"
                size={fontSize.lg}
                color="#3F1956"
              />
            )}
            selectedStyle={[
              styles.selectedStyle,
              { backgroundColor: theme.colors.placeholderColor },
            ]}
          />
        )}
      </View>
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
          renderDropdown(
            value ?? (type === "multiSelect" ? [] : ""),
            onChange,
            error
          )
        }
      />
    );
  }

  // Uncontrolled fallback
  return renderDropdown(localValue, undefined, undefined);
};

export default CustomDropDown;
