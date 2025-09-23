import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import MessageCard from "@/components/MessageCard";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useTheme } from "styled-components/native";

const AgreementScreen = () => {
  const { prevStep } = useApplicationStore();
  const theme = useTheme();
  return (
    <CustomMainChild
      title={t("Agreement")}
      subTitle={t("Find all the agreements/documents here.")}
      noOfButtons={1}
      singleButtonTitle={t("Back")}
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => router.back()}
    >
        <MessageCard message={t("You don’t have any new requests as of now")}/>

    </CustomMainChild>
  );
};

export default AgreementScreen;
