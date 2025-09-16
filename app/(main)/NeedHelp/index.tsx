import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import SegmentedControl from "@/components/SegmentControl";
import { fontSize, fontWeight, width } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const RequestCallBack = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: formData,
    shouldUnregister: true,
  });

  const cityOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Sharja", value: "Sharjha" },
  ];

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
  ];

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.primaryColor,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
    },
    row: {
      flexDirection: "row",
      gap: 46,
      alignItems: "center",
    },
    innerRow: {
      width: width.md,
    },
  });
  return (
    <FormSummaryLayout onSaveAndBack={() => router.push("/(main)/NavScreen")}>
      <Text style={styles.text}>Request Callback</Text>

      <CustomInput
        name={fieldNames.borrowerName}
        label="Ref no."
        placeholder="89765321"
        type="text"
        control={control}
      />
      <View style={styles.row}>
        <View style={styles.innerRow}>
          <CustomInput
            label="First Name"
            placeholder="Myank"
            type="text"
            control={control}
          />
        </View>
        <View style={styles.innerRow}>
          <CustomInput
            label="Last Name"
            placeholder="Tyagi"
            type="text"
            control={control}
          />
        </View>
      </View>
      <CustomInput
        name={fieldNames.supplementaryCardName}
        label="Email"
        placeholder="myankTyagi@gmail.com"
        type="text"
        control={control}
      />

      <View style={styles.row}>
        <View style={styles.innerRow}>
          <CustomInput
            label="Mobile Number"
            placeholder="mobile no"
            type="text"
            control={control}
          />
        </View>
        <View style={styles.innerRow}>
          <CustomDropDown
            label={"Gender"}
            data={genderOptions}
            control={control}
          />
        </View>
      </View>

      <SegmentedControl
        label={"Marital Status"}
        options={["Single", "Married"]}
        defaultValue={"Single"}
        onChange={function (value: string): void {
          console.log("martial status changed");
        }}
      />

      <CustomDropDown
        name={fieldNames.borrowerGender}
        label={"City"}
        data={cityOptions}
        control={control}
      />

      <CustomInput
        label="Description"
        placeholder="Need help for Credit Card"
        type="textarea"
        numberOfLines={7}
      />
    </FormSummaryLayout>
  );
};

export default RequestCallBack;
