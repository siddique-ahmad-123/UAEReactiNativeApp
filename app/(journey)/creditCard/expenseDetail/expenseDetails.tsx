import ExpenseList from "@/components/ExpenseList";
import FormLayout from "@/components/Form/FormLayout";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const ExpenseDetails = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
  const expenses = [
    { name: fieldNames.houseRent, label: t("houseRent") },
    { name: fieldNames.groceryExpenses, label: t("groceryExpenses") },
    { name: fieldNames.houseBills, label: t("houseBills") },
    { name: fieldNames.foodDeliveries, label: t("foodDeliveries") },
    { name: fieldNames.schoolCost, label: t("schoolCost") },
    { name: fieldNames.leisure, label: t("leisure") },
    { name: fieldNames.healthcare, label: t("healthcare") },
    { name: fieldNames.otherExpenses, label: t("otherExpenses") },
  ];
  return (
    <FormLayout
      stepNumber={3}
      title={t("expenseDetails")}
      subTitle={t("lifeStyleExpenses")}
      noOfBars={1}
      activeBarIndex={1}
      onBack={() => prevStep()}
      onClose={() => router.push("/(main)/NavScreen")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <ExpenseList data={expenses} control={control} />
    </FormLayout>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({});
