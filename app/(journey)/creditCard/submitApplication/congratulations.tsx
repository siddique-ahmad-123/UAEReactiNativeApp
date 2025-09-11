import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";
import { styles } from "@/app/(main)/styles/submitApplication2";

const Congratulations = () => {
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
        {/* Approved Icon & Title */}
        <View style={styles.image}>
          <Image
            source={require("../../../../assets/images/approved-icon.png")}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
            Congratulations !!
          </Text>
          <Text
            style={[
              styles.textbox3,
              { color: theme.colors.secondaryText, marginBottom: 30 },
            ]}
          >
            Your Credit Card will be dispatched in 1 day {"\n"} {"\n"} {"\n"}
            You’ll soon receive a confirmation from our side over SMS and Email
            regarding dispatch details.{"\n"} {"\n"} {"\n"}
            {"\n"} Your ‘PIN’ will be available in Mobile App, once the card is
            delivered
          </Text>
        </View>
        <View style={styles.linkTextView}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[styles.linktext, { color: theme.colors.primaryColor }]}
            >
              Your Application No is RLOS_CC_1234
            </Text>
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <CustomButton
          title="Return to Home Page"
          size="full"
          variant="primary"
          type="filled"
          onPress={() => {router.push("/NavScreen")}}
          style={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Congratulations;
