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

const RequestScreen = () => {
  const theme = useTheme();
const { prevStep } = useApplicationStore();

  return (
    <CustomMainChild
      title="Request"
      subTitle="Find all the requests that you have raised here."
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => router.back()}
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <MessageCard message="You don’t have any new requests as of now" />
      
      </View>
    </CustomMainChild>
  );
};

export default RequestScreen;
