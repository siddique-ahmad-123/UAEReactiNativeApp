import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native"; // your existing Calculator
import BottomNav from "@/components/BottomNav";
import EMICalculatorScreen from "../calculator";
import Dashboard from "../home";
import RequestsScreen from "../notification";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Dashboard />;
      case "Calculator":
        return <EMICalculatorScreen />;
      case "Need Help":
        return <View style={styles.dummy}><></></View>; // replace later
      case "Notifications":
        return <RequestsScreen />; // replace later
      case "Menu":
        return <View style={styles.dummy}><></></View>; // replace later
      default:
        return <Dashboard />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  dummy: { flex: 1, alignItems: "center", justifyContent: "center" }
});

export default MainScreen;
