import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import DocumentDownload from "@/components/DocumentDownload";
import Checkbox from "expo-checkbox";
import DynamicSliderCard from "@/components/CustomSliderCard/DynamicSliderCard";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";

const SelectRequiredAmount = () => {
  const [financeAmount, setFinanceAmount] = useState<number>(50000);
  const [isChecked, setChecked] = useState(false);
  const theme = useTheme();
  const { nextStep, prevStep } = useApplicationStore();
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
  });
  return (
    <CustomMainChild
      title="Select Required Amount"
      noOfButtons={2}
      doubleButtonTitle1="Cancel"
      doubleButtonTitle2="Next"
      onPressDoubleButton1={() => prevStep()}
      onPressDoubleButton2={() => nextStep()}
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
      <View style={{ marginTop: 70 }} />
      <DocumentDownload documentName="Download Terms & Conditions" />
      <DocumentDownload documentName="Download Fees & Charges" />
      <DocumentDownload documentName="Download Key Fact Statement" />

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
    </CustomMainChild>
  );
};

export default SelectRequiredAmount;
