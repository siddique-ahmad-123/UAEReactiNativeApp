import React from "react";
import MessageCard from "@/components/MessageCard";
import { router } from "expo-router";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { t } from "i18next";

const ExistingApplicantstScreen = () => {
  return (
    <CustomMainChild
      title={t("Existing Applications")}
      subTitle={t("Find all the existing applications here.")}
      noOfButtons={1}
      singleButtonTitle={t("Back")}
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => router.back()}
    >
        <MessageCard message={t("You don’t have any new requests as of now")} />
    </CustomMainChild>
  );
};

export default ExistingApplicantstScreen;
