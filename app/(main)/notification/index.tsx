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
import { router } from "expo-router";
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
            Notifications
          </Text>
          <TouchableOpacity>
            <Text
              style={[styles.closeButton, { color: theme.colors.background }]}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subHeader, { color: theme.colors.background }]}>
          Find all the Notifications that you have raised here.
        </Text>
      </View>

      {/* White Container with Rounded Top */}
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Show Request Card */}
        <RequestCard
          refNo="89765321"
          date="03/09/2025"
          status="Pending"
          onPress={() => console.log("Details clicked")}
        />

        {/* Footer Button */}
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
