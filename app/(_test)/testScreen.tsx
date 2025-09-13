/* eslint-disable react-hooks/rules-of-hooks */

import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const testScreen = () => {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 10000); // 4s splash
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>🎉 Main App Screen</Text>
    </View>
  );
}

export default testScreen;

const styles = StyleSheet.create({});
