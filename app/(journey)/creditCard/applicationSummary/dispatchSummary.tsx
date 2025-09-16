import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "styled-components/native";

const DispatchSummary = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.primaryColor,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
    },
  });

  const emiratesOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
  ];
  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];
  return (
    <FormSummaryLayout onSaveAndBack={() => router.push("/(main)/NavScreen")}>
      <Text style={styles.text}>Summary - Dispatch Details</Text>

      <CustomInput
        name={fieldNames.borrowerName}
        label="Name on Card"
        placeholder="Enter your name"
        type="text"
        control={control}
      />

      <CustomInput
        name={fieldNames.supplementaryCardName}
        label="Supplementary Card Name"
        placeholder=""
        type="text"
        control={control}
      />

      <Text style={styles.text}>Dispatch Address</Text>

      <CustomInput
        name={fieldNames.dispatchAddressLine1}
        label="Address Line 1"
        placeholder="Enter your address"
        type="text"
        control={control}
      />
      <CustomInput
        name={fieldNames.dispatchAddressLine2}
        label="Address Line 2"
        placeholder="Enter your address"
        type="text"
        control={control}
      />

      <CustomDropDown
        name={fieldNames.dispatchEmirates}
        label={"Emirates"}
        data={emiratesOptions}
        control={control}
      />
      <CustomDropDown
        name={fieldNames.dispatchCountry}
        label={"Country"}
        data={countryOptions}
        control={control}
      />
    </FormSummaryLayout>
  );
};

export default DispatchSummary;
