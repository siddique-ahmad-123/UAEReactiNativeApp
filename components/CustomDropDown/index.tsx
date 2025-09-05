import { fontSize, radius, spacingX, spacingY } from "@/constants/Metrics";
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
    paddingVertical: spacingY._5,
    paddingHorizontal: spacingX._12,
    marginVertical: spacingY._15,
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
    top: -spacingY._12,
    left: spacingX._12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: spacingX._5,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
  },
  labelLine: {
    height: 1.5,
    backgroundColor: "#ccc",
    marginLeft: spacingX._7,
  },
  dropdown: {
    height: spacingY._40,
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
    marginLeft: spacingX._7,
  },
  selectedStyle: {
    borderRadius: radius.sm,
    backgroundColor: "#EDE7F6",
    paddingHorizontal: spacingX._7,
    paddingVertical: spacingY._7,
    margin: spacingX._5,
  },
});
