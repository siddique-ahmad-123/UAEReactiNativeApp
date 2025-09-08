import { fontSize, radius, spacing, spacingVertical } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface CustomDatePickerProps {
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  variant?: "full" | "half";
  mandatory?: boolean;
}

const CustomDatePicker = ({
  label,
  placeholder = "Select date...",
  minDate,
  maxDate,
  variant = "full",
  mandatory = false,
}: CustomDatePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getVariantStyle = () => {
    switch (variant) {
      case "half":
        return styles.half;
      case "full":
      default:
        return styles.full;
    }
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
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

      {/* Input Box */}
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={selectedDate ? styles.dateText : styles.placeholderText}>
          {selectedDate
            ? selectedDate.toLocaleDateString("en-GB") // dd/mm/yyyy
            : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={fontSize.lg} color="#3F1956" />
      </TouchableOpacity>

      {/* Modal Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: radius.md,
    paddingVertical: spacingVertical.md,
    paddingHorizontal: spacing.md,
    marginVertical: spacingVertical.md,
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
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: spacingVertical.md,
  },
  placeholderText: {
    fontSize: fontSize.md,
    color: "#999",
  },
  dateText: {
    fontSize: fontSize.md,
    color: "#000",
  },
});
