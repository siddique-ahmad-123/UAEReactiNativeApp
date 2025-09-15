import React from "react";
import RequestCard from "@/components/RequestCard";
import { router } from "expo-router";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";

const NotificationScreen = () => {
  const { prevStep } = useApplicationStore();
  return (
    <CustomMainChild
      title="Notification"
      subTitle="Find all your notifications here"
      
    >
      <RequestCard
        refNo="89765321"
        date="03/09/2025"
        status="Pending"
        onPress={() => router.push("/(main)/notification2")}
      />
    </CustomMainChild>
  );
};

export default NotificationScreen;