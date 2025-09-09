import React, { useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { styles } from "../styles/Calculator.Styles";
import InputCard from "@/components/InputCard";
import { useTheme } from "styled-components/native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const formatNumber = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const EMICalculatorScreen: React.FC = () => {
  // State
  const [financeAmount, setFinanceAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(36);
  const [profitRate, setProfitRate] = useState<number>(6);

  // layout widths for custom slider fill
  const [trackWidthFA, setTrackWidthFA] = useState<number>(0);
  const [trackWidthTen, setTrackWidthTen] = useState<number>(0);
  const [trackWidthPR, setTrackWidthPR] = useState<number>(0);

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
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor:theme.colors.background}]}>
      {/* top purple strip (statusbar area) */}
      <View style={[styles.topPurple,{backgroundColor:theme.colors.primaryColor}]} />

      {/* Greeting row with avatar */}
      <View style={styles.greetingRow}>
        <Image
          source={require("../../../assets/images/avatar.png")} // replace with your avatar
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={[styles.greetingSmall,{color:theme.colors.inactiveNavIconColor}]}>Good Morning,</Text>
          <Text style={[styles.greetingName,{color:theme.colors.shadowColor}]}>Abdul Rahman</Text>
        </View>
      </View>

      {/* Purple EMI Card */}
      <View style={[styles.emiCard,{backgroundColor:theme.colors.primaryColor}]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.emiTitle,{color:theme.colors.background}]}>EMI Calculator</Text>
          <Text style={[styles.emiDesc,{color:theme.colors.background}]} numberOfLines={4}>
            This calculator will help you to calculate the expected EMI on your
            loan amount by taking into consideration the Principal Amount, Loan
            Tenure and Interest.
          </Text>
        </View>

        <Image
          source={require("../../../assets/images/emi.png")} // replace with your illustration
          style={styles.emiImage}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* White container (rounded top) */}
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          {/* Finance Amount card */}
          <InputCard
            label="Finance Amount"
            value={financeAmount}
            min={10000}
            max={2000000}
            step={1000}
            unit="AED"
            onChange={setFinanceAmount}
            formatValue={formatNumber}
          />

          {/* Tenure card */}
          <InputCard
            label="Tenure (Months)"
            value={tenure}
            min={12}
            max={120}
            step={1}
            unit="Mon"
            onChange={setTenure}
          />

          {/* Profit Rate card */}
          <InputCard
            label="Profit Rate"
            value={profitRate}
            min={1}
            max={10}
            step={1}
            unit="%"
            onChange={setProfitRate}
          />

          <View
            style={[
              styles.inputCard,{shadowColor:theme.colors.shadowColor},
              { backgroundColor: theme.colors.background },
              { borderColor: theme.colors.borderColor },
            ]}
          >
            <Text style={[styles.resultLabel,{color:theme.colors.primaryColor}]}>Monthly Installment</Text>
            <View style={[styles.resultCard,{borderColor:theme.colors.background}]}>
              <View>
                <Text style={[styles.resultAmount,{color:theme.colors.shadowColor}]}>
                  {formatNumber(monthlyInstallment)}
                </Text>
              </View>
              <Text style={[styles.resultUnit,{color:theme.colors.primaryLightColor}]}>AED</Text>
            </View>
          </View>

          {/* Back button */}
          <CustomButton
                  title="Back"
                  size="full"
                  variant="primary"
                  type="filled"
                  onPress={() => router.push("/NavScreen")}
                  style={{ marginTop: 0}}
                />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EMICalculatorScreen;
