import ExpenseList from "@/components/ExpenseList";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "styled-components/native";

const ExpenseSummary = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.primaryColor,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
    },
  });
  return (
    <FormSummaryLayout onSaveAndBack={() => router.back()}>
      <Text style={styles.text}>Summary - Dispatch Details</Text>
      <ExpenseList />
    </FormSummaryLayout>
  );
};

export default ExpenseSummary;
