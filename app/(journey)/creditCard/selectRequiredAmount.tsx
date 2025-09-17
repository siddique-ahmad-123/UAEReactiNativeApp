import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import DocumentDownload from "@/components/DocumentDownload";
import Checkbox from "expo-checkbox";
import DynamicSliderCard from "@/components/CustomSliderCard/DynamicSliderCard";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { spacingVertical } from "@/constants/Metrics";
import { useForm } from "react-hook-form";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";

const SelectRequiredAmount = () => {
  const theme = useTheme();
  const { nextStep, formData, prevStep, updateField } = useApplicationStore();
  const [financeAmount, setFinanceAmount] = useState<number>(
    formData?.[fieldNames.selectedRequiredAmount] || 10000
  );
  const [isChecked, setChecked] = useState(
    formData?.[fieldNames.isCheckedTermandCond] || false
  );
  const { setValue } = useForm({
    defaultValues: formData,
  });
  const onClickNext = () => {
    setValue(fieldNames.isCheckedTermandCond, isChecked);
    updateField(fieldNames.isCheckedTermandCond, isChecked);
    setValue(fieldNames.selectedRequiredAmount, financeAmount);
    updateField(fieldNames.selectedRequiredAmount, financeAmount);
    console.log("Store formData:", formData);
    nextStep();
  };
  const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 20,
      gap: 8,
    },
    checkboxLabel: {
      flex: 1,
      fontSize: 12,
      color: theme.colors.primaryColor,
    },
    checkbox: {
      margin: 8,
    },
    bottomContainer: {
      flex: 1,
      gap: spacingVertical.sm,
    },
  });
  return (
    <CustomMainChild
      title="Select Required Amount"
      noOfButtons={2}
      doubleButtonTitle1="Cancel"
      doubleButtonTitle2="Next"
      onPressDoubleButton1={() => prevStep()}
      onPressDoubleButton2={() => onClickNext()}
      isDisableDoubleButton2={!isChecked}
      disableOuterScroll={true}
    >
      <DynamicSliderCard
        title="Card Amount"
        value={financeAmount}
        setValue={setFinanceAmount}
        min={10000}
        max={200000}
        step={1000}
        unit="AED"
      />
      <View style={styles.bottomContainer}>
        <DocumentDownload
          url={process.env.EXPO_PUBLIC_TERMS_CONDITIONS_URL}
          documentName="Download Terms & Conditions"
        />
        <DocumentDownload
          url={process.env.EXPO_PUBLIC_FEES_CHARGES_URL}
          documentName="Download Fees & Charges"
        />
        <DocumentDownload
          url={process.env.EXPO_PUBLIC_KAS_URL}
          documentName="Download Key Fact Statement"
        />

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? theme.colors.primaryColor : undefined}
          />
          <Text style={styles.checkboxLabel}>
            I agree with below provided Terms and Conditions, Fees and Charges
            Sheet and Key Fact Statement.
          </Text>
        </View>
      </View>
    </CustomMainChild>
  );
};

export default SelectRequiredAmount;
