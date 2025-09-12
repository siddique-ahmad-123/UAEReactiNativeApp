import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { localStyles } from "../styles/Notification2.Styles";
import { useApplicationStore } from "@/store/applicationStore";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { router } from "expo-router";

const NotificationScreen = () => {
  const theme = useTheme();
  const { prevStep } = useApplicationStore();
  return (
    <CustomMainChild
      title="Notification"
      subTitle="Find all the Notifications that you have raised here."
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.back()}
      onPressSingleButton={() => router.back()}
    >
      <Text style={localStyles.title2}>Your Request is under processing</Text>
      <Text style={localStyles.subtitle}>
        We will notify you once we receive any update on your request
      </Text>
      <View
        style={[
          localStyles.textBox,
          { borderColor: theme.colors.borderColor },
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text
          style={[
            localStyles.label,
            { color: theme.colors.primaryColor },
            { backgroundColor: theme.colors.background },
          ]}
        >
          Description
        </Text>
        <Text style={[localStyles.value, { color: theme.colors.shadowColor }]}>
          Need help for Credit Card
        </Text>
      </View>
      <View
        style={[
          localStyles.textBox,
          { borderColor: theme.colors.borderColor },
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text
          style={[
            localStyles.label,
            { color: theme.colors.primaryColor },
            { backgroundColor: theme.colors.background },
          ]}
        >
          Resolution Provided
        </Text>
        <Text style={[localStyles.value, { color: theme.colors.shadowColor }]}>
          Pending...
        </Text>
      </View>
    </CustomMainChild>
  );
};

export default NotificationScreen;
