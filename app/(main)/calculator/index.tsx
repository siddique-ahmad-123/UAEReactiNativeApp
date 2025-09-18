import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import DynamicSliderCard from "@/components/CustomSliderCard/DynamicSliderCard";
import { spacing, spacingVertical } from "@/constants/Metrics";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import UserIconName from "@/components/UserProfile/userIconName";

const EMICalculatorScreen: React.FC = () => {
  const theme = useTheme();
  const { value: storedUser } = useAsyncStorage("user");

  // State
  const [financeAmount, setFinanceAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(36);
  const [profitRate, setProfitRate] = useState<number>(6);

  // EMI calculation
  function calculateEMI(principal: number, annualRate: number, months: number) {
    const r = annualRate / 100 / 12;
    if (r === 0) return principal / months;
    return (
      (principal * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1)
    );
  }
  const monthlyInstallment = Math.round(
    calculateEMI(financeAmount, profitRate, tenure)
  );

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: spacing.md,
      justifyContent: "space-between", // ✅ Pushes content up/down evenly
    },
    topSection: {
      gap: spacingVertical.md,
    },
    emiCard: {
      borderRadius: 12,
      padding: spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: theme.colors.primaryColor,
    },
    emiTitle: {
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 6,
      color: theme.colors.background,
    },
    emiDesc: {
      fontSize: 14,
      lineHeight: 18,
      opacity: 0.95,
      color: theme.colors.background,
    },
    emiImage: {
      width: 100,
      height: 100,
      marginLeft: 8,
    },
    inputCard: {
      borderRadius: 12,
      padding: spacing.sm,
      borderWidth: 1,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.borderColor,
      shadowColor: theme.colors.shadowColor,
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    resultCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 12,
      borderWidth: 1,
      padding: spacing.sm,
      borderColor: theme.colors.borderColor,
    },
    resultLabel: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 6,
      color: theme.colors.primaryColor,
    },
    resultAmount: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.shadowColor,
    },
    resultUnit: {
      fontSize: 18,
      fontWeight: "500",
      color: theme.colors.borderColor,
    },
  });

  return (
    <View style={styles.mainContainer}>
      {/* 🔹 TOP CONTENT */}
      <View style={styles.topSection}>
        <UserIconName
          name={storedUser?.name ?? "Guest"}
          imgPath={storedUser?.userType}
        />

        {/* EMI Intro Card */}
        <View style={styles.emiCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.emiTitle}>EMI Calculator</Text>
            <Text style={styles.emiDesc} numberOfLines={4}>
              This calculator will help you to calculate the expected EMI on
              your loan amount by taking into consideration the Principal
              Amount, Loan Tenure and Interest.
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/emi.png")}
            style={styles.emiImage}
            resizeMode="contain"
          />
        </View>

        {/* Sliders */}
        <DynamicSliderCard
          title="Finance Amount"
          value={financeAmount}
          setValue={setFinanceAmount}
          min={10000}
          max={200000}
          step={1000}
          unit="AED"
        />
        <DynamicSliderCard
          title="Tenure (Months)"
          value={tenure}
          setValue={setTenure}
          min={12}
          max={120}
          step={1}
          unit="Mon"
        />
        <DynamicSliderCard
          title="Profit Rate"
          value={profitRate}
          setValue={setProfitRate}
          min={1}
          max={20}
          step={0.1}
          unit="%"
        />
      </View>

      {/* 🔹 BOTTOM RESULT SECTION */}
      <View style={styles.inputCard}>
        <Text style={styles.resultLabel}>Monthly Installment</Text>
        <View style={styles.resultCard}>
          <Text style={styles.resultAmount}>
            {monthlyInstallment.toLocaleString()}
          </Text>
          <Text style={styles.resultUnit}>AED</Text>
        </View>
      </View>
    </View>
  );
};

export default EMICalculatorScreen;
