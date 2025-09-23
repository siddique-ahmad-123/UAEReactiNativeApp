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
      title={t("notification")}
      subTitle={t("findAllNotification")}
      noOfButtons={1}
      singleButtonTitle={t("back")}
      onClose={() => router.back()}
      onPressSingleButton={() => router.back()}
    >
      <Text style={localStyles.title2}>Your Request is under processing</Text>
      <Text style={localStyles.subtitle}>
        {t("weWillNotifyYouOnce")}
      </Text>
      <CustomInput
        label={t("description")}
        placeholder={t("needHelpForCreditCard")}
        type="textarea"
        numberOfLines={9}
      />

      <CustomInput
        label={t("resolutionProvided")}
        placeholder={t("Pending..")}
        type="textarea"
        numberOfLines={9}
      />
     
    </CustomMainChild>
  );
};

export default NotificationScreen;