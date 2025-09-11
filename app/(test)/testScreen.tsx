/* eslint-disable react-hooks/rules-of-hooks */

import { StyleSheet, View } from "react-native";
import DynamicSliderCard from "./amountCard2";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";

const testScreen = () => {
const [financeAmount, setFinanceAmount] = useState(50000);
  const [tenure, setTenure] = useState(36);
  const [rate, setRate] = useState(7.5);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    {/* <ScrollView style={{ flex: 1, padding: 16 }}>
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
        title="Interest Rate"
        value={rate}
        setValue={setRate}
        min={1}
        max={20}
        step={0.1}
        unit="%"
      />
    </ScrollView> */}
    <CustomMainChild title="Requeest" subTitle="oooo" noOfButtons={1} singleButtonTitle="Back" onClose={()=>""}/>
    </GestureHandlerRootView>
  );
};

export default testScreen;

const styles = StyleSheet.create({});
