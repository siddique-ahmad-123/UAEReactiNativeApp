import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import SegmentedControl from "@/components/SegmentControl";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";

const PersonalSummary = () => {
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

  const borrowerType = watch("borrowerType") ?? "Borrower";

  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.primaryColor,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
    },
  });

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
  ];

  const nationalityOptions = [
    { label: "Indian", value: "India" },
    { label: "Persians", value: "Persians" },
  ];

  const emiratesOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
  ];

  const validityOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  return (
    <FormSummaryLayout onSaveAndBack={() => router.back()}>
      {/* <Text style={styles.text}>Summary - Personal Details</Text> */}
      <SegmentedControl
        label={"Summary - Personal Details"}
        options={["Borrower", "Co-Borrower"]}
        defaultValue={borrowerType}
        onChange={(value) => setValue("borrowerType", value)}
      />

      {borrowerType === "Borrower" ? (
        <>
          {/* Borrower Fields */}
          <CustomInput
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            control={control}
          />

          <CustomDropDown
            label={"Gender"}
            data={genderOptions}
            control={control}
          />

          <CustomInput
            name="age"
            label="Age"
            placeholder="Age"
            type="number"
            control={control}
          />

          <CustomDropDown
            label={"Nationality"}
            data={nationalityOptions}
            control={control}
          />

          <CustomInput
            name="Emirates ID"
            label="EIDA No"
            placeholder="Enter your EIDA Number"
            type="number"
            control={control}
          />

          <CustomInput
            name="passportNo"
            label="Passport No"
            placeholder="Enter your passport Number"
            type="number"
            control={control}
          />

          <CustomInput
            name="residenceVintage"
            label="Residence Vintage(Months)"
            placeholder="Enter your residence vintage"
            type="number"
            control={control}
          />

          <CustomInput
            name="noOfDependents"
            label="No of Dependents"
            placeholder="Enter the number of dependents"
            type="number"
            control={control}
          />

          <CustomDropDown
            label={"Whether EIDA, Passport are Valid?"}
            data={validityOptions}
            control={control}
          />

          <CustomDropDown
            label={"Emirates"}
            data={emiratesOptions}
            control={control}
          />
        </>
      ) : (
        <>
          {/* Co_Borrower Fields */}
          <CustomInput
            name=""
            label="Name"
            placeholder="Name"
            type="text"
            control={control}
          />

          <CustomDropDown
            label={"Gender"}
            data={genderOptions}
            control={control}
          />

          <CustomInput
            name="age"
            label="Age"
            placeholder="Age"
            type="number"
            control={control}
          />

          <CustomDropDown
            label={"Nationality"}
            data={nationalityOptions}
            control={control}
          />

          <CustomInput
            name="Emirates ID"
            label="EIDA No"
            placeholder="Enter your EIDA Number"
            type="number"
            control={control}
          />

          <CustomInput
            name="passportNo"
            label="Passport No"
            placeholder="Enter your passport Number"
            type="number"
            control={control}
          />

          <CustomInput
            name="residenceVintage"
            label="Residence Vintage(Months)"
            placeholder="Enter your residence vintage"
            type="number"
            control={control}
          />

          <CustomInput
            name="noOfDependents"
            label="No of Dependents"
            placeholder="Enter the number of dependents"
            type="number"
            control={control}
          />

          <CustomDropDown
            label={"Whether EIDA, Passport are Valid?"}
            data={validityOptions}
            control={control}
          />

          <CustomDropDown
            label={"Emirates"}
            data={emiratesOptions}
            control={control}
          />
        </>
      )}
    </FormSummaryLayout>
  );
};

export default PersonalSummary;
