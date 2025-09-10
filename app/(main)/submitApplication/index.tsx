import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";

import CustomButton from "@/components/CustomButton";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";
import { styles } from "../styles/submitApplication.Styles";
// import your card

const NotificationScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.primaryColor }]}
    >
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text
            style={[styles.headerTitle, { color: theme.colors.textHeader }]}
          >
            Submit Application
          </Text>
          <TouchableOpacity>
            <Text
              style={[styles.closeButton, { color: theme.colors.background }]}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* White Container with Rounded Top */}
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      > 
       <View style={styles.image}>
    <Image
      source={require("../../../assets/images/approved-icon.png")}
      style={{ width: 80, height: 80 }}
      resizeMode="contain"
    />
    <Text
      style={[styles.textbox2,{color:theme.colors.textPrimary}]}
    >
      Application Approved
    </Text>
    <Text
      style={[styles.textbox,{color:theme.colors.secondaryText}]}
    >
      Your application is approved successfully
    </Text>
  </View>
        <CustomButton
          title="Back"
          size="full"
          variant="primary"
          type="filled"
          onPress={() => router.push("/NavScreen")}
          style={{ marginTop: 420 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
