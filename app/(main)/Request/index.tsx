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
import MessageCard from "@/components/MessageCard";
// import your card

const RequestScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor:theme.colors.primaryColor}]}>
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.colors.textHeader }]}>Request</Text>
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
        <MessageCard message="You don’t have any new requests as of now" />
        {/* Footer Button */}
         <CustomButton
        title="Back"
        size="full"
        variant="primary"
        type="filled"
        onPress={() => console.log("Check pressed")}
        style={{ marginTop: 490 }}
      />

      </View>
    </SafeAreaView>
  );
};

export default RequestScreen;
