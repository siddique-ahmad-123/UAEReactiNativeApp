import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import { fontSize, fontWeight } from "@/constants/Metrics";
import {
  useGetEmiratesBranchDropDownValuesQuery,
  useGetEmiratesDropDownValuesQuery,
} from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { placeHoldersNames } from "@/schemas/creditCard/allFieldsPlaceholder";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const DispatchSummary = () => {
  const { updateField, formData } = useApplicationStore();
  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    router.back();
  };

  const dispatchType = formData["dispatchType"];

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
  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];

  const { data: emiratesBranch } = useGetEmiratesBranchDropDownValuesQuery(
    formData[fieldNames.dispatchBranchName],
    { skip: !formData[fieldNames.dispatchBranchName] }
  );

  const emiratesBranches = emiratesBranch?.data ?? [
    {
      label: "Ajman Corniche",
      value: "Ajman Corniche",
    },
    {
      label: "Ajman Free Zone",
      value: "Ajman Free Zone",
    },
  ];

  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.primaryColor,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
    },
  });

  return (
    <FormSummaryLayout onSaveAndBack={handleSubmit(onSubmit)}>
      <Text style={styles.text}>Summary - Dispatch Details</Text>

      <CustomInput
        name={fieldNames.borrowerName}
        label="Name on Card"
        placeholder={placeHoldersNames.Name}
        type="text"
        control={control}
      />
      <CustomInput
        name={fieldNames.supplementaryCardName}
        label="Supplementary Card Name"
        placeholder={placeHoldersNames.SupplementaryCard}
        type="text"
        control={control}
      />

      <Text style={styles.text}>Dispatch Address</Text>

      {dispatchType === "Mailing Address" ? (
        <>
          <CustomInput
            control={control}
            name={fieldNames.dispatchAddressLine1}
            label="Address Line 1"
            placeholder={placeHoldersNames.Address}
            type="text"
          />
          <CustomInput
            control={control}
            name={fieldNames.dispatchAddressLine2}
            label="Address Line 2"
            placeholder={placeHoldersNames.Address}
            type="text"
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
        </>
      ) : (
        <>
          <CustomDropDown
            name={fieldNames.dispatchEmirates}
            label={"Emirates"}
            data={emiratesOptions}
            control={control}
          />
          <CustomDropDown
            name={fieldNames.dispatchBranchName}
            label={"Branch Name"}
            data={emiratesBranches}
            control={control}
          />

          <View>
            <Text style={{ textAlign: "center" }}>
              Collection Timings - 9 AM to 4 PM (Monday to Friday)
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>
              Card will be re-dispatched to Head Office if not collected within
              30 days
            </Text>
          </View>
        </>
      )}
    </FormSummaryLayout>
  );
};

export default DispatchSummary;
