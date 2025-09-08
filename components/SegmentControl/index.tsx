import { fontSize, radius, spacing, spacingVertical } from "@/constants/Metrics";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text style={styles.label}>
        {label}
        {mandatory && <Text style={{ color: "red" }}> *</Text>}
      </Text>

      {/* Segmented Control */}
      <View style={styles.container}>
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleSelect(option)}
            >
              <Text style={[styles.text, isSelected && styles.textSelected]}>
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

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: spacingVertical.md,
    width: "90%",
    alignSelf: "center",
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: "#3F1956",
    marginBottom: spacingVertical.md,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#EDE6F5",
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacingVertical.md,
    borderRadius: radius.sm,
  },
  optionSelected: {
    backgroundColor: "#3F1956",
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#333",
  },
  textSelected: {
    color: "#fff",
  },
});
