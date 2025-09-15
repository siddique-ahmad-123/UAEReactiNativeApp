import {
  borderWidth,
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import React, { useMemo } from "react";
import { Controller, Control, useWatch } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "styled-components/native";

type ExpenseItem = {
  name: string;
  label: string;
};

type Props = {
  data: ExpenseItem[];
  control: Control<any>; // 👈 allow any form schema
};

const ExpenseList = ({ data, control }: Props) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: radius.xl,
      backgroundColor: theme.colors.background,
      overflow: "hidden",
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
      padding: spacing.md,
    },
    row: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      marginBottom: spacingVertical.sm,
    },
    label: {
      flex: 1,
      color: theme.colors.primaryColor,
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
      color:theme.colors.primaryColor,
      padding: 0,
    },
    currency: {
      marginLeft: spacing.sm,
      color: theme.colors.primaryColor,
      fontSize: fontSize.xs,
    },
  });

  // ✅ Watch all expense fields
  const values = useWatch({ control });

  // ✅ Calculate total dynamically
  const total = useMemo(() => {
    return data.reduce((sum, row) => {
      const v = parseFloat(values?.[row.name]) || 0;
      return sum + v;
    }, 0);
  }, [values, data]);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Total Expenses</Text>
        <Text style={styles.headerAmount}>{total.toLocaleString()} AED</Text>
      </View>

      {/* Expense list */}
      <View style={styles.list}>
        {data.map((row, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{row.label}</Text>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name={row.name}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={value?Number(value).toLocaleString():""}
                    onChangeText={(text) =>
                      onChange(text.replace(/[^0-9]/g, "")) // only numbers
                    }
                  />
                )}
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
