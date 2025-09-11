import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import DynamicSliderCard from "@/components/CustomSliderCard/DynamicSliderCard";
import { spacing, spacingVertical } from "@/constants/Metrics";

const EMICalculatorScreen: React.FC = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: spacing.md,
      gap: spacingVertical.md,
    },
    greetingRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
    },
    greetingSmall: {
      fontSize: 13,
    },
    greetingName: {
      fontSize: 16,
      fontWeight: "700",
      marginTop: 2,
    },

    emiCard: {
      borderRadius: 12,
      padding: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    emiTitle: {
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 6,
    },
    emiDesc: {
      fontSize: 14,
      lineHeight: 18,
      opacity: 0.95,
    },
    emiImage: {
      width: 100,
      height: 100,
      marginLeft: 8,
    },

    container: {
      flex: 1,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      backgroundColor: theme.colors.background,
      gap: spacingVertical.sm,
    },

    inputCard: {
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      shadowOpacity: 0.03,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },

    resultCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 12,
      borderWidth: 1,
      padding: 16,
      marginBottom: 18,
    },
    resultLabel: {
      fontSize: 18,
      marginBottom: 6,
      fontWeight: "600",
    },
    resultAmount: {
      fontSize: 18,
      fontWeight: "400",
    },
    resultUnit: {
      fontSize: 16,
      fontWeight: "500",
    },

    backButton: {
      paddingVertical: 14,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: "center",
    },
    backButtonText: {
      fontWeight: "800",
      fontSize: 16,
    },
  });
  // State
  const [financeAmount, setFinanceAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(36);
  const [profitRate, setProfitRate] = useState<number>(6);

  // EMI calculation
  function calculateEMI(principal: number, annualRate: number, months: number) {
    const r = annualRate / 100 / 12;
    if (r === 0) return principal / months;
    const emi =
      (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return emi;
  }
  const monthlyInstallment = Math.round(
    calculateEMI(financeAmount, profitRate, tenure)
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.greetingRow}>
        <Image
          source={require("../../../assets/images/avatar.png")} // replace with your avatar
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={[
              styles.greetingSmall,
              { color: theme.colors.inactiveNavIconColor },
            ]}
          >
            Good Morning,
          </Text>
          <Text
            style={[styles.greetingName, { color: theme.colors.shadowColor }]}
          >
            Abdul Rahman
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.emiCard,
              { backgroundColor: theme.colors.primaryColor },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.emiTitle, { color: theme.colors.background }]}
              >
                EMI Calculator
              </Text>
              <Text
                style={[styles.emiDesc, { color: theme.colors.background }]}
                numberOfLines={4}
              >
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
          <View
            style={[
              styles.inputCard,
              { shadowColor: theme.colors.shadowColor },
              { backgroundColor: theme.colors.background },
              { borderColor: theme.colors.borderColor },
            ]}
          >
            <Text
              style={[styles.resultLabel, { color: theme.colors.primaryColor }]}
            >
              Monthly Installment
            </Text>
            <View
              style={[
                styles.resultCard,
                { borderColor: theme.colors.borderColor },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.resultAmount,
                    { color: theme.colors.shadowColor },
                  ]}
                >
                  {monthlyInstallment.toLocaleString()}
                </Text>
              </View>
              <Text
                style={[styles.resultUnit, { color: theme.colors.borderColor }]}
              >
                AED
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Back button */}
      <CustomButton
        title="Back"
        size="full"
        variant="primary"
        type="filled"
        onPress={() => router.push("/NavScreen")}
        style={{ marginTop: 0 }}
      />
    </View>
  );
};

export default EMICalculatorScreen;
