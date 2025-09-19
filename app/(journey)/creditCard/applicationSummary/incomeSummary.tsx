import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import SectionHeader from "@/components/SectionHeader";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { placeHoldersNames } from "@/schemas/creditCard/allFieldsPlaceholder";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "styled-components/native";

const IncomeSummary = () => {
  const { updateField, formData } = useApplicationStore();
  const { control, handleSubmit, watch, setValue } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    router.back();
  };

  const borrowerType = watch("borrowerType") ?? "Borrower";
  const borrowerIncomeType = watch(fieldNames.borrowerIncomeType) ?? "Salaried";
  const borrowerSalary = watch(fieldNames.borrowerMonthlySalaryAECB);

  const calculateTotalIncome = (v:string) => {
    setValue(
      "borrowerSalaryTotalIncome",
     parseInt(borrowerSalary) +
        parseInt(v)
    );
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
    <FormSummaryLayout onSaveAndBack={handleSubmit(onSubmit)}>
      <Text style={styles.text}>Summary - Income & Occupation Details</Text>
      {/* <SegmentedControl
        label={"Summary - Income Details"}
        options={["Borrower", "Co-Borrower"]}
        defaultValue={borrowerType}
        onChange={(value) => setValue("borrowerType", value)}
      /> */}

      {borrowerType === "Borrower" ? (
        <>
          {borrowerIncomeType === "Salaried" ? (
            <>
              {/* Borrower (Salaried) */}
              <SectionHeader sectionName={"Income Details - Salaried"} />

              <CustomInput
                name={fieldNames.borrowerEmployerName}
                label="Employer Name"
                type="text"
                placeholder="Newgen Software"
                control={control}
              />

              <CustomDatePicker
                name={fieldNames.borrowerEmployedFrom}
                label="Employed From"
                control={control}
              />
              <CustomDropDown
                name={fieldNames.borrowerEmirates}
                label="Emirates"
                data={emiratesOptions}
                control={control}
              />

              <CustomInput
                name={fieldNames.borrowerVerificationStatus}
                label="Verification Status"
                type="text"
                placeholder={placeHoldersNames.Verification}
                control={control}
              />

              <CustomInput
                name={fieldNames.borrowerMonthlySalaryAECB}
                label="Monthly Salary Income"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
              />
              <CustomInput
                name="borrowerAddIncome"
                label="Monthly Additional Income"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
                onChangeText={calculateTotalIncome}
              />
              <CustomInput
                name=""
                label="Monthly Average Balance"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
              />
              <CustomInput
                name="borrowerSalaryTotalIncome"
                label="Total Income"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
              />
            </>
          ) : (
            <>
              {/* Borrower (Self-Employed) */}
              <SectionHeader sectionName={"Income Details - Self Employed"} />
              <CustomInput
                name={fieldNames.borrowerNameOfBusiness}
                label="Business Name"
                placeholder="Business Name"
                type="text"
                control={control}
              />
              <CustomDropDown
                name={fieldNames.borrowerLegalForm}
                label="Legal Form"
                data={legalFormOptions}
                control={control}
              />
              <CustomInput
                name={fieldNames.borrowerLicenseNo}
                label="License No"
                type="text"
                placeholder="DLT34554"
                control={control}
              />
              <CustomDatePicker
                name={fieldNames.borrowerDateOfEstabilishment}
                label="Date of Establishment"
                control={control}
              />
              <CustomDatePicker
                name=""
                label="Date of Expiry"
                control={control}
              />
              <CustomDropDown
                name={fieldNames.borrowerVerificationStatus}
                label="Verification Status"
                data={statusOptions}
                control={control}
              />
              <CustomInput
                name=""
                label="Monthly Business Income"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
              />
              <CustomInput
                name=""
                label="Monthly Additional Income"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
              />
              <CustomInput
                name=""
                label="Total Income"
                placeholder={placeHoldersNames.Number}
                type="number"
                control={control}
                formatWithCommas={true}
              />
            </>
          )}
        </>
      ) : (
        <>
          {/* Co-Borrower (Salaried) */}
          <SectionHeader sectionName={"Income Details - Salaried"} />

          <CustomInput
            name={fieldNames.coBorrowerEmployerName}
            label="Employer Name"
            type="text"
            placeholder="Newgen Software"
            control={control}
          />

          <CustomDatePicker
            name={fieldNames.coBorrowerEmployedFrom}
            label="Employed From"
            control={control}
          />
          <CustomDropDown
            name={fieldNames.coBorrowerEmirates}
            label="Emirates"
            data={emiratesOptions}
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerVerificationStatus}
            label="Verification Status"
            type="text"
            placeholder={placeHoldersNames.Verification}
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerMonthlySalaryAECB}
            label="Monthly Salary Income"
            placeholder={placeHoldersNames.Number}
            type="number"
            control={control}
            formatWithCommas={true}
          />
          <CustomInput
            name=""
            label="Monthly Additional Income"
            placeholder={placeHoldersNames.Number}
            type="number"
            control={control}
            formatWithCommas={true}
          />
          <CustomInput
            name=""
            label="Monthly Average Balance"
            placeholder={placeHoldersNames.Number}
            type="number"
            control={control}
            formatWithCommas={true}
          />
          <CustomInput
            name=""
            label="Total Income"
            placeholder={placeHoldersNames.Number}
            type="number"
            control={control}
            formatWithCommas={true}
          />

          {/* Co-Borrower (Self-Employed) */}
          <SectionHeader sectionName={"Income Details - Self Employed"} />

          <CustomInput
            name={fieldNames.coBorrowerNameOfBusiness}
            label="Business Name"
            placeholder={placeHoldersNames.BusinessName}
            type="text"
            control={control}
          />

          <CustomDropDown
            name={fieldNames.coBorrowerLegalForm}
            label="Legal Form"
            data={legalFormOptions}
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerLicenseNo}
            label="License No"
            type="text"
            placeholder="DLT34554"
            control={control}
          />

          <CustomDatePicker
            name={fieldNames.coBorrowerDateOfEstabilishment}
            label="Date of Establishment"
            control={control}
          />

          <CustomDatePicker name="" label="Date of Expiry" control={control} />

          <CustomDropDown
            name={fieldNames.coBorrowerVerificationStatus}
            label="Verification Status"
            data={statusOptions}
            control={control}
          />

          <CustomInput
            name=""
            label="Monthly Business Income"
            placeholder={placeHoldersNames.Number}
            type="number"
            control={control}
            formatWithCommas={true}
          />

          <CustomInput
            name=""
            label="Monthly Additional Income"
            placeholder={placeHoldersNames.MonthlyAddIncom}
            type="number"
            control={control}
            formatWithCommas={true}
          />

          <CustomInput
            name=""
            label="Total Income"
            placeholder={placeHoldersNames.TotalIncome}
            type="number"
            control={control}
            formatWithCommas={true}
          />
        </>
      )}
    </FormSummaryLayout>
  );
};

export default IncomeSummary;
