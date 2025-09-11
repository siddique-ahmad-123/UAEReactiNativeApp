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
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.back()}
      onPressSingleButton={() => prevStep()}
    >
      <RequestCard
        refNo="89765321"
        date="03/09/2025"
        status="Pending"
        onPress={() => console.log("Details clicked")}
      />
    </CustomMainChild>
  );
};

export default NotificationScreen;
