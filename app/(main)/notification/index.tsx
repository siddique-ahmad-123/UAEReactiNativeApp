import React from "react";
import RequestCard from "@/components/RequestCard";
import { router } from "expo-router";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { t } from "i18next";

const NotificationScreen = () => {
  const { prevStep } = useApplicationStore();
  return (
    <CustomMainChild
      title={t("Notification")}
      subTitle={t("Find all your notifications here")}
      
    >
      <RequestCard
        refNo={t("89765321")}
        date={t("03/09/2025")}
        status="Pending"
        onPress={() => router.push("/(main)/notification2")}
      />
    </CustomMainChild>
  );
};

export default NotificationScreen;