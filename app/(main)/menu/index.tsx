import React from "react";
import { Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/onboarding.Styles";


export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Calculator Screen</Text>
      </View>
    </SafeAreaView>
  );
}

// Local styles specific to this screen

