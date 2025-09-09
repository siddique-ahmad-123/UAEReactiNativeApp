
 


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "../styles/Notification.Styles";
import RequestCard from "@/components/RequestCard";
import CustomButton from "@/components/CustomButton";
import { useTheme } from "styled-components/native";
import { localStyles } from "../styles/Notification2.Styles";
// import your card

const NotificationScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor:theme.colors.primaryColor}]}>
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.colors.textHeader }]}>Notifications</Text>
          <TouchableOpacity>
            <Text style={[styles.closeButton,{color:theme.colors.background}]}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subHeader,{color:theme.colors.background}]}>
          Find all the Notifications that you have raised here.
        </Text>
      </View>

      {/* White Container with Rounded Top */}
      <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
        {/* Show Request Card */}
        <Text style={localStyles.title2}>Your Request is under processing</Text>
        <Text style={localStyles.subtitle}>
          We will notify you once we receive any update on your request
        </Text>
        <View style={[localStyles.textBox,{borderColor:theme.colors.borderColor},{backgroundColor:theme.colors.background}]}>
          <Text style={[localStyles.label,{color:theme.colors.primaryColor},{backgroundColor:theme.colors.background}]}>Description</Text>
          <Text style={[localStyles.value,{color:theme.colors.shadowColor}]}>Need help for Credit Card</Text>
        </View>
        <View style={[localStyles.textBox,{borderColor:theme.colors.borderColor},{backgroundColor:theme.colors.background}]}>
          <Text style={[localStyles.label,{color:theme.colors.primaryColor},{backgroundColor:theme.colors.background}]}>Resolution Provided</Text>
          <Text style={[localStyles.value,{color:theme.colors.shadowColor}]}>Pending...</Text>
        </View>

        {/* Footer Button */}
         <CustomButton
        title="Back"
        size="full"
        variant="primary"
        type="filled"
        onPress={() => console.log("Check pressed")}
        style={{ marginTop: 50 }}
      />

      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
