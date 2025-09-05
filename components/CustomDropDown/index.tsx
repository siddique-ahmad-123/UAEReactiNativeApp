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
            <Ionicons name="chevron-down" size={20} color="#3F1956" />
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
            <Ionicons name="chevron-down" size={20} color="#3F1956" />
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
    borderRadius: 8,
    padding: 10,
    marginVertical: 12,
    backgroundColor: "#fff",
  },
  full: {
    width: "90%",
  },
  half: {
    width: "45%",
  },
  labelContainer: {
    position: "absolute",
    top: -10,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3F1956",
  },
  labelLine: {
    height: 1.5,
    backgroundColor: "#ccc",
    marginLeft: 6,
  },
  dropdown: {
    height: 40,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  iconStyle: {
    marginLeft: 8,
  },
  selectedStyle: {
    borderRadius: 8,
    backgroundColor: "#EDE7F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
  },
});
