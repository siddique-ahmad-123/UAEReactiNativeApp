import React, { useState } from "react";
import { View, StyleSheet } from "react-native"; 
import BottomNav from "@/components/BottomNav";
import EMICalculatorScreen from "../calculator";
import Dashboard from "../home";
import { useTheme } from "styled-components/native";
import ApplicationSummary from "../NeedHelp";
import RequestCallBack from "../NeedHelp";
import MenuScreen from "../menu";
import RequestsScreen from "@/app/(journey)/creditCard/selectCreditCard";
import NotificationScreen from "../notification";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Dashboard />;
      case "Calculator":
        return <EMICalculatorScreen />;
      case "Need Help":
        return <RequestCallBack />; 
      case "Notifications":
        return <NotificationScreen />; 
      case "Menu":
        return <MenuScreen/>; 
      default:
        return <Dashboard />;
    }
  };

  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>{renderContent()}</View>
      {(
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: { flex: 1},
  content: { flex: 1 },
  dummy: { flex: 1, alignItems: "center", justifyContent: "center" }
});

export default MainScreen;
