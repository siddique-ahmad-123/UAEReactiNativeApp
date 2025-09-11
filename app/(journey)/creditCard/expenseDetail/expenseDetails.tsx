import ExpenseList from "@/components/ExpenseList";
import FormLayout from "@/components/Form/FormLayout";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const ExpenseDetails = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
    shouldUnregister: true,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
  return (
    <FormLayout
      stepNumber={3}
      title={t("expenseDetails")}
      subTitle={t("lifeStyleExpenses")}
      noOfBars={1}
      activeBarIndex={1}
      onBack={() => prevStep()}
      onClose={() => router.push("/")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <ExpenseList />
    </FormLayout>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({});
