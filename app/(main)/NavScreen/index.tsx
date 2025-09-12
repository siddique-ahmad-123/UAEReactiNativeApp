import React, { useState } from "react";
import { View, StyleSheet } from "react-native"; 
import BottomNav from "@/components/BottomNav";
import EMICalculatorScreen from "../calculator";
import Dashboard from "../home";
import RequestsScreen from "../notification";
import { useTheme } from "styled-components/native";
import ApplicationSummary from "../NeedHelp";
import RequestCallBack from "../NeedHelp";

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
        return <RequestsScreen />; 
      case "Menu":
        return <View style={styles.dummy}><></></View>; 
      default:
        return <Dashboard />;
    }
  };

  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>{renderContent()}</View>
      {activeTab === "Home" && (
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
