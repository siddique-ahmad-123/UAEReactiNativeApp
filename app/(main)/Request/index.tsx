import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import MessageCard from "@/components/MessageCard";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import {
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "../../../components/styles/Notification.Styles";
import { t } from "i18next";

const RequestScreen = () => {
  const theme = useTheme();
const { prevStep } = useApplicationStore();

  return (
    <CustomMainChild
      title={t("requests")}
      subTitle={t("findAllTheRequests")}
      noOfButtons={1}
      singleButtonTitle={t("Back")}
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => router.back()}
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <MessageCard message={t("youDontHaveAnyNew")} />
      
      </View>
    </CustomMainChild>
  );
};

export default RequestScreen;
