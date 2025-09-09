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
// import your card

const NotificationScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.colors.textHeader }]}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>
          Find all the Notifications that you have raised here.
        </Text>
      </View>

      {/* White Container with Rounded Top */}
      <View style={styles.container}>
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
        onPress={() => console.log("Check pressed")}
        style={{ marginTop: 500 }}
      />

      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
