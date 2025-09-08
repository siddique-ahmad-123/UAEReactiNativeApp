import React from "react";
import { Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 // Assuming styles.container is available
import { localStyles } from "../styles/Calculator.Styles";
import { styles } from "../styles/onboarding.Styles";


export default function CalculatorScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={localStyles.content}>
        <Text style={localStyles.title}>Calculator Screen</Text>
      </View>
    </SafeAreaView>
  );
}

// Local styles specific to this screen

