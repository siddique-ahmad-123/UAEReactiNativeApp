import React from "react";
import {
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import MessageCard from "@/components/MessageCard";
import { router } from "expo-router";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
// import your card

const ExistingApplicantstScreen = () => {
   const {  prevStep } = useApplicationStore();
  return (
    <CustomMainChild
      title="Existing Applications"
      subTitle="Find all the existing applications here."
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.back()}
      onPressSingleButton={() => prevStep()}
    >
        <MessageCard message="You don’t have any new requests as of now" />
    </CustomMainChild>
  );
};

export default ExistingApplicantstScreen;
