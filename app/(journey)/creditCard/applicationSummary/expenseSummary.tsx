import ExpenseList from "@/components/ExpenseList";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
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
  const { updateField, formData } = useApplicationStore();
  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    router.back()
  };
  const expenses = [
    { name: fieldNames.houseRent, label: "House Rent" },
    { name: fieldNames.groceryExpenses, label: "Grocery Expenses" },
    { name: fieldNames.houseBills, label: "House Bills" },
    { name: fieldNames.foodDeliveries, label: "Food Deliveries" },
    { name: fieldNames.schoolCost, label: "School Cost" },
    { name: fieldNames.leisure, label: "Leisure" },
    { name: fieldNames.healthcare, label: "Healthcare" },
    { name: fieldNames.otherExpenses, label: "Other Expenses" },
  ];
  return (
    <FormSummaryLayout onSaveAndBack={handleSubmit(onSubmit)}>
      <Text style={styles.text}>Summary - Dispatch Details</Text>
      <ExpenseList data={expenses} control={control}/>
    </FormSummaryLayout>
  );
};

export default ExpenseSummary;
