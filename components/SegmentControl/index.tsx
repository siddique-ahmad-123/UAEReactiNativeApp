import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

interface SegmentedControlProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
  mandatory?: boolean;
}

const SegmentedControl = ({
  label,
  options,
  onChange,
  defaultValue,
  mandatory = false,
}: SegmentedControlProps) => {
  const [selected, setSelected] = useState(defaultValue || options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange(option);
  };

  const theme = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      width: "100%",
      alignSelf: "center",
    },
    label: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
      marginBottom: spacingVertical.sm,
      color: theme.colors.primaryColor
    },
    container: {
      flexDirection: "row",
      borderRadius: radius.sm,
      backgroundColor: theme.colors.primaryLightColor 
    },
    option: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacingVertical.md,
      borderRadius: radius.sm,
    },
    optionSelected: {
      // backgroundColor: "#3F1956",
    },
    text: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
    },
  });
  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text style={styles.label}>
        {label}
        {mandatory && <Text style={{ color: "red" }}> *</Text>}
      </Text>

      {/* Segmented Control */}
      <View
        style={styles.container}>
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected && [
                  styles.optionSelected,
                  { backgroundColor: theme.colors.primaryColor },
                ],
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text
                style={[
                  [styles.text, { color: theme.colors.textPrimary }],
                  isSelected && [
                    { color: theme.colors.statusBarText },
                  ],
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SegmentedControl;
