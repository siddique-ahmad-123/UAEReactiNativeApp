import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import { fontSize, fontWeight } from "@/constants/Metrics";
import { useGetEmiratesDropDownValuesQuery } from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { placeHoldersNames } from "@/schemas/creditCard/allFieldsPlaceholder";
import { useApplicationStore } from "@/store/applicationStore";
import { getDateDifferenceFromToday } from "@/utils/dateParser";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "styled-components/native";

const PersonalSummary = () => {
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

  useEffect(() => {
    const eidaExpiryDate: string = formData[fieldNames.borrowerEidaExpiryDate];
    let passportExpiryDate = formData[fieldNames.borrowerPassportExpiryDate];

    const eidaDiff = getDateDifferenceFromToday(eidaExpiryDate);
    const passportDiff = getDateDifferenceFromToday(passportExpiryDate);

    if (eidaDiff !== null && passportDiff !== null) {
      if (eidaDiff > 0 && passportDiff > 0) {
        setValue("borrowerVerified", "Yes");
      } else {
        setValue("borrowerVerified", "No");
      }
    }
  });

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
    { label: "Indian", value: "Indian" },
    { label: "Persians", value: "Persians" },
  ];

  const { data: emirates } = useGetEmiratesDropDownValuesQuery();

  const emiratesOptions = emirates?.data ?? [
    {
      label: "Abu Dhabi",
      value: "Abu Dhabi",
    },
    {
      label: "Ajman",
      value: "Ajman",
    },
    {
      label: "Dubai",
      value: "Dubai",
    },
  ];

  const validityOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  return (
    <FormSummaryLayout onSaveAndBack={handleSubmit(onSubmit)}>
      <Text style={styles.text}>Summary - Personal Details</Text>
      {/* <SegmentedControl
        label={"Summary - Personal Details"}
        options={["Borrower", "Co-Borrower"]}
        defaultValue={borrowerType}
        onChange={(value) => setValue("borrowerType", value)}
      /> */}

      {borrowerType === "Borrower" ? (
        <>
          {/* Borrower Fields */}
          <CustomInput
            name={fieldNames.borrowerName}
            label="Name"
            placeholder={placeHoldersNames.Name}
            type="text"
            control={control}
          />

          <CustomDropDown
            name={fieldNames.borrowerGender}
            label={"Gender"}
            data={genderOptions}
            control={control}
          />

          <CustomInput
            name={fieldNames.borrowerAge}
            label="Age"
            placeholder={placeHoldersNames.Age}
            type="number"
            control={control}
          />

          <CustomDropDown
            name={fieldNames.borrowerNationality}
            label={"Nationality"}
            data={nationalityOptions}
            control={control}
          />

          <CustomInput
            name={fieldNames.borrowerEidaNo}
            label="Emirates ID"
            placeholder={placeHoldersNames.EIDA}
            type="number"
            maxLength={15}
            control={control}
          />

          <CustomInput
            name={fieldNames.borrowerPassportNo}
            label="Passport No"
            placeholder={placeHoldersNames.PassportNumber}
            type="number"
            control={control}
          />

          <CustomInput
            name={fieldNames.borrowerVintage}
            label="Residence Vintage(Months)"
            placeholder={placeHoldersNames.ResidenceVintage}
            type="number"
            control={control}
          />

          <CustomInput
            name={fieldNames.borrowerNoOfDependents}
            label="No of Dependents"
            placeholder={placeHoldersNames.DependentsNumber}
            type="number"
            control={control}
          />

          <CustomDropDown
            name="borrowerVerified"
            label={"Whether EIDA, Passport are Valid?"}
            data={validityOptions}
            control={control}
          />

          <CustomDropDown
            name={fieldNames.borrowerEmirates}
            label={"Emirates"}
            data={emiratesOptions}
            control={control}
          />
        </>
      ) : (
        <>
          {/* Co_Borrower Fields */}
          <CustomInput
            name={fieldNames.coBorrowerName}
            label="Name"
            placeholder="Name"
            type="text"
            control={control}
          />

          <CustomDropDown
            name={fieldNames.coBorrowerGender}
            label={"Gender"}
            data={genderOptions}
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerAge}
            label="Age"
            placeholder={placeHoldersNames.Age}
            type="number"
            control={control}
          />

          <CustomDropDown
            name={fieldNames.coBorrowerNationality}
            label={"Nationality"}
            data={nationalityOptions}
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerEmirateId}
            label="Emirates ID"
            placeholder={placeHoldersNames.EIDA}
            type="number"
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerPassportNo}
            label="Passport No"
            placeholder={placeHoldersNames.PassportNumber}
            type="number"
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerResidenceVintage}
            label="Residence Vintage(Months)"
            placeholder={placeHoldersNames.ResidenceVintage}
            type="number"
            control={control}
          />

          <CustomInput
            name={fieldNames.coBorrowerNoOfDependents}
            label="No of Dependents"
            placeholder={placeHoldersNames.DependentsNumber}
            type="number"
            control={control}
          />

          <CustomDropDown
            name={fieldNames.coBorrowerVerificationStatus}
            label={"Whether EIDA, Passport are Valid?"}
            data={validityOptions}
            control={control}
          />

          <CustomDropDown
            name={fieldNames.coBorrowerEmirates}
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
