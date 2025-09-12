import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { localStyles } from "../styles/Notification2.Styles";
import { useApplicationStore } from "@/store/applicationStore";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { router } from "expo-router";
import CustomInput from "@/components/CustomInput";

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
      <CustomInput
        label="Description"
        placeholder="Need help for Credit Card"
        type="textarea"
        numberOfLines={9}
      />

      <CustomInput
        label="Resolution Provided"
        placeholder="Pending.."
        type="textarea"
        numberOfLines={9}
      />
     
    </CustomMainChild>
  );
};

export default NotificationScreen;
