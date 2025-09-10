import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";

const IncomeSummary = () => {
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

  const emiratesOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Abu Dhabi", value: "Abu Dhabi" },
    { label: "Sharjah", value: "Sharjah" },
    { label: "Ajman", value: "Ajman" },
    { label: "Umm Al-Quwain", value: "Umm Al-Quwain" },
    { label: "Fujairah", value: "Fujairah" },
    { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
  ];

  const legalFormOptions = [
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    {
      label: "Limited Liability Company (LLC)",
      value: "Limited Liability Company (LLC)",
    },
  ];

  const statusOptions = [
    { label: "Initiated", value: "Initiated" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ];
  return (
    <FormSummaryLayout onSaveAndBack={() => router.back()}>
      <SegmentedControl
        label={"Summary - Income Details"}
        options={["Borrower", "Co-Borrower"]}
        defaultValue={borrowerType}
        onChange={(value) => setValue("borrowerType", value)}
      />

      {borrowerType === "Borrower" ? (
        <>
          {/* Borrower (Salaried) */}
          <SectionHeader sectionName={"Income Details - Salaried"} />

          <CustomInput
            name="employerName"
            label="Employer Name"
            type="text"
            placeholder="Newgen Software"
            control={control}
          />

          <CustomDatePicker
            name="employedFrom"
            label="Employed From"
            control={control}
          />
          <CustomDropDown
            name="emirate"
            label="Emirates"
            data={emiratesOptions}
            control={control}
          />

          <CustomInput
            name=""
            label="Verification Status"
            type="text"
            placeholder="Verification Status"
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Salary Income"
            placeholder="2000"
            type="number"
            control={control}
          />
          <CustomInput
            name=""
            label="Monthly Additional Income"
            placeholder="2000"
            type="number"
            control={control}
          />
          <CustomInput
            name=""
            label="Monthly Average Balance"
            placeholder="2000"
            type="number"
            control={control}
          />
          <CustomInput
            name=""
            label="Total Income"
            placeholder="2000"
            type="number"
            control={control}
          />

          {/* Borrower (Self-Employed) */}
          <SectionHeader sectionName={"Income Details - Self Employed"} />

          <CustomInput
            name=""
            label="Business Name"
            placeholder="Business Name"
            type="text"
            control={control}
          />

          <CustomDropDown
            name="legalForm"
            label="Legal Form"
            data={legalFormOptions}
            control={control}
          />

          <CustomInput
            name="licenseNo"
            label="License No"
            type="text"
            placeholder="DLT34554"
            control={control}
          />

          <CustomDatePicker
            name="dateOfEstabilishment"
            label="Date of Establishment"
            control={control}
          />

          <CustomDatePicker name="" label="Date of Expiry" control={control} />

          <CustomDropDown
            name=""
            label="Verification Status"
            data={statusOptions}
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Business Income"
            placeholder="2000"
            type="number"
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Additional Income"
            placeholder="2000"
            type="number"
            control={control}
          />

          <CustomInput
            name=""
            label="Total Income"
            placeholder="2000"
            type="number"
            control={control}
          />
        </>
      ) : (
        <>
          {/* Co-Borrower (Salaried) */}
          <SectionHeader sectionName={"Income Details - Salaried"} />

          <CustomInput
            name=""
            label="Employer Name"
            type="text"
            placeholder="Newgen Software"
            control={control}
          />

          <CustomDatePicker
            name="employedFrom"
            label="Employed From"
            control={control}
          />
          <CustomDropDown
            name="emirate"
            label="Emirates"
            data={emiratesOptions}
            control={control}
          />

          <CustomInput
            name=""
            label="Verification Status"
            type="text"
            placeholder="Verification Status"
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Salary Income"
            placeholder="2000"
            type="number"
            control={control}
          />
          <CustomInput
            name=""
            label="Monthly Additional Income"
            placeholder="2000"
            type="number"
            control={control}
          />
          <CustomInput
            name=""
            label="Monthly Average Balance"
            placeholder="2000"
            type="number"
            control={control}
          />
          <CustomInput
            name=""
            label="Total Income"
            placeholder="2000"
            type="number"
            control={control}
          />

          {/* Co-Borrower (Self-Employed) */}
          <SectionHeader sectionName={"Income Details - Self Employed"} />

          <CustomInput
            name=""
            label="Business Name"
            placeholder="Business Name"
            type="text"
            control={control}
          />

          <CustomDropDown
            name="legalForm"
            label="Legal Form"
            data={legalFormOptions}
            control={control}
          />

          <CustomInput
            name="licenseNo"
            label="License No"
            type="text"
            placeholder="DLT34554"
            control={control}
          />

          <CustomDatePicker
            name="dateOfEstabilishment"
            label="Date of Establishment"
            control={control}
          />

          <CustomDatePicker name="" label="Date of Expiry" control={control} />

          <CustomDropDown
            name=""
            label="Verification Status"
            data={statusOptions}
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Business Income"
            placeholder="2000"
            type="number"
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Additional Income"
            placeholder="2000"
            type="number"
            control={control}
          />

          <CustomInput
            name=""
            label="Total Income"
            placeholder="2000"
            type="number"
            control={control}
          />
        </>
      )}
    </FormSummaryLayout>
  );
};

export default IncomeSummary;
