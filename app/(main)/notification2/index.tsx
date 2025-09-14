import CustomInput from "@/components/CustomInput";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useTheme } from "styled-components/native";
import { localStyles } from "../../../components/styles/Notification2.Styles";

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
