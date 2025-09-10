import {
  borderWidth,
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "styled-components/native";

const ExpenseList = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      borderRadius: radius.xl,
      backgroundColor: theme.colors.background,
      overflow: "hidden",
      // elevation: 3,
      borderWidth: borderWidth.normal,
      borderColor: theme.colors.borderColor,
    },
    header: {
      backgroundColor: theme.colors.primaryColor,
      padding: spacing.md,
    },
    headerTitle: {
      color: theme.colors.textHeader,
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
      marginBottom: spacingVertical.xs,
    },
    headerAmount: {
      color: theme.colors.textHeader,
      fontSize: fontSize.xl,
      fontWeight: fontWeight.medium,
    },
    list: {
      padding: 16,
    },
    row: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      marginBottom: spacingVertical.sm,
    },
    label: {
      flex: 1,
      color: "#666",
      fontSize: fontSize.md,
    },
    inputContainer: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      borderWidth: borderWidth.normal,
      borderColor: theme.colors.inputFieldBorder,
      borderRadius: radius.lg,
      paddingHorizontal: spacing.sm,
      height: spacingVertical.xxl,
      minWidth: spacing.xxxxl,
      justifyContent: "space-between",
    },
    input: {
      flex: 1,
      textAlign: "right",
      fontSize: fontSize.sm,
      padding: 0,
    },
    currency: {
      marginLeft: spacing.sm,
      color: "#999",
      fontSize: fontSize.xs,
    },
  });
  const expenses = [
    "House Rent",
    "House Bills",
    "Grocery Expenses",
    "Food Deliveries",
    "School Cost",
    "Leisure",
    "Healthcare",
    "Other Expenses",
  ];
  const [values, setValues] = useState(
    expenses.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {})
  );

  // Calculate total dynamically
  const total = useMemo(() => {
    return Object.values(values).reduce(
      (sum, v) => sum + (parseFloat(v) || 0),
      0
    );
  }, [values]);

  const handleChange = (key: string, text: string) => {
    // Allow only numbers
    const cleaned = text.replace(/[^0-9]/g, "");
    setValues((prev) => ({ ...prev, [key]: cleaned }));
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Total Expenses</Text>
        <Text style={styles.headerAmount}>{total.toLocaleString()} AED</Text>
      </View>

      {/* Expense list */}
      <View style={styles.list}>
        {expenses.map((label, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={values[label]}
                onChangeText={(text) => handleChange(label, text)}
              />
              <Text style={styles.currency}>AED</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ExpenseList;
