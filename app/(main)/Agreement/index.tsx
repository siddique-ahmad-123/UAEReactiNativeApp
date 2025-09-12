import React from "react";
import { View } from "react-native";
import { styles } from "../styles/Notification.Styles";
import { useTheme } from "styled-components/native";
import MessageCard from "@/components/MessageCard";
import { router } from "expo-router";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";

const AgreementScreen = () => {
  const { prevStep } = useApplicationStore();
  const theme = useTheme();
  return (
    <CustomMainChild
      title="Agreement"
      subTitle="Find all the agreements/documents here."
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.back()}
      onPressSingleButton={() => router.back()}
    >
        <MessageCard message="You don’t have any new requests as of now" />

    </CustomMainChild>
  );
};

export default AgreementScreen;
