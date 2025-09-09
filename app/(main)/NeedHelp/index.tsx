import React from "react";
import { View, Text, SafeAreaView} from "react-native";
import { localStyles } from "../styles/NeedHelp.Styles";
import { styles } from "../styles/onboarding.Styles";
import { useTheme } from "styled-components/native";

export default function NeedHelpScreen() {
  const theme = useTheme()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={localStyles.title}>Calculator Screen</Text>
      </View>
    </SafeAreaView>
  );
}


