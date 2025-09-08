import { fontSize, radius, spacing, spacingVertical } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

interface CustomDropDownProps {
  label: string;
  placeholder?: string;
  data: { label: string; value: string }[];
  type?: "singleSelect" | "multiSelect";
  variant?: "full" | "half";
  mandatory?: boolean;
}

const CustomDropDown = ({
  label,
  placeholder = "Select...",
  data,
  type = "singleSelect",
  variant = "full",
  mandatory = false,
}: CustomDropDownProps) => {
  const [value, setValue] = useState<string | string[]>(
    type === "multiSelect" ? [] : ""
  );

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
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {mandatory && <Text style={{ color: "red" }}> *</Text>}
        </Text>
        <View style={styles.labelLine} />
      </View>

      {type === "singleSelect" ? (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={(item) => setValue(item.value)}
          renderRightIcon={() => (
            <Ionicons name="chevron-down" size={fontSize.lg} color="#3F1956" />
          )}
        />
      ) : (
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value as string[]}
          onChange={(items) => setValue(items)}
          renderRightIcon={() => (
            <Ionicons name="chevron-down" size={fontSize.lg} color="#3F1956" />
          )}
          selectedStyle={styles.selectedStyle}
        />
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: radius.md,
    paddingVertical: spacingVertical.md,
    paddingHorizontal: spacing.lg,
    marginVertical: spacingVertical.xl,
    backgroundColor: "#fff",
  },
  full: {
    width: "100%",
  },
  half: {
    width: "48%",
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
  dropdown: {
    height: spacingVertical.lg,
  },
  placeholderStyle: {
    fontSize: fontSize.md,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: fontSize.md,
    color: "#000",
  },
  iconStyle: {
    marginLeft: spacing.md,
  },
  selectedStyle: {
    borderRadius: radius.sm,
    backgroundColor: "#EDE7F6",
    paddingHorizontal: spacing.md,
    paddingVertical: spacingVertical.md,
    margin: spacing.md,
  },
});
