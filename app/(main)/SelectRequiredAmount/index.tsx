import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "../styles/Notification.Styles";
import { useTheme } from "styled-components/native";
import InputCard from "@/components/InputCard";
import CustomButton from "@/components/CustomButton";
import { gstyles } from "../styles/selectRequiredLoan";
import DocumentDownload from "@/components/DocumentDownload";
import { router } from "expo-router";
import Checkbox from 'expo-checkbox';

// Format number with commas
const formatNumber = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const SelectRequiredAmount = () => {
  const [financeAmount, setFinanceAmount] = useState<number>(50000);
  const [isChecked, setChecked] = useState(false); 
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.primaryColor }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text
            style={[styles.headerTitle, { color: theme.colors.textHeader }]}
          >
            Select Required Amount
          </Text>
          <TouchableOpacity onPress={() => router.push("/selectcreditcard")}>
            <Text
              style={[styles.closeButton, { color: theme.colors.background }]}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* White Container with Rounded Top */}
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Card Slider */}
        <InputCard
          label="Card Amount"
          value={financeAmount}
          min={10000}
          max={2000000}
          step={1000}
          unit="AED"
          onChange={setFinanceAmount}
          formatValue={formatNumber}
        />
        <View style={{ marginTop: 70 }} />
        <DocumentDownload documentName="Download Terms & Conditions" />
        <DocumentDownload documentName="Download Fees & Charges" />
        <DocumentDownload documentName="Download Key Fact Statement" />

        <View style={gstyles.checkboxContainer}>
          <Checkbox
           style={gstyles.checkbox}
          value={isChecked}
         onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
         />
          <Text
            style={[
              gstyles.checkboxLabel,
              { color: theme.colors.primaryColor },
            ]}
          >
            I agree with below provided Terms and Conditions, Fees and Charges
            Sheet and Key Fact Statement.
          </Text>
        </View>

        {/* Footer Buttons */}
        <View style={[gstyles.row, { marginTop: 30, marginBottom: 20 }]}>
          <CustomButton
            title="Cancel"
            onPress={() => {}}
            variant="secondary"
            type="outlined"
            size="md"
          />
          <CustomButton
            title="Next"
            onPress={() => {
              if (!isChecked) {
                alert("Please accept the terms before proceeding.");
                return;
              }
            }}
            variant="primary"
            type="filled"
            size="md"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectRequiredAmount;
