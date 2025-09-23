import CustomInput from "@/components/CustomInput";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useTheme } from "styled-components/native";
import { localStyles } from "../../../components/styles/Notification2.Styles";
import { t } from "i18next";

const NotificationScreen = () => {
  const theme = useTheme();
  const { prevStep } = useApplicationStore();
  return (
    <CustomMainChild
      title={t("Notification")}
      subTitle={t("Find all the Notifications that you have raised here.")}
      noOfButtons={1}
      singleButtonTitle={t("Back")}
      onClose={() => router.back()}
      onPressSingleButton={() => router.back()}
    >
      <Text style={localStyles.title2}>Your Request is under processing</Text>
      <Text style={localStyles.subtitle}>
        We will notify you once we receive any update on your request
      </Text>
      <CustomInput
        label={t("Description")}
        placeholder={t("Need help for Credit Card")}
        type="textarea"
        numberOfLines={9}
      />

      <CustomInput
        label={t("Resolution Provided")}
        placeholder={t("Pending..")}
        type="textarea"
        numberOfLines={9}
      />
     
    </CustomMainChild>
  );
};

export default NotificationScreen;