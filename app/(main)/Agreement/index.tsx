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
      title={t("agreements")}
      subTitle={t("findAllTheAgreements")}
      noOfButtons={1}
      singleButtonTitle={t("back")}
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => router.back()}
    >
        <MessageCard message={t("youDontHaveAnyNewExisting")}/>

    </CustomMainChild>
  );
};

export default AgreementScreen;
