import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import MethodSelector from "@/components/MethodSelector";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "../../../components/styles/submitApplication3.Styles";

const NotificationScreen = () => {
  const theme = useTheme();
  const { prevStep } = useApplicationStore();
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();

  const methodOptions = [
    {
      id: "email",
      title: "Credit Limit",
      description: "",
      iconName: "mail-outline",
      amount: "250 AED",
    },
    {
      id: "sms",
      title: "Joining Fees",
      description: "Will be deducted from 1st credit card installment",
      iconName: "chatbubble-outline",
      amount: "45000 AED",
    },
    {
      id: "app",
      title: "Annual Fees",
      description: "Stay updated in the app",
      iconName: "notifications-outline",
      amount: "650 AED",
    },
  ];

  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={2}
      onClose={() => router.push("/(main)/NavScreen")}
      doubleButtonTitle1={"Need higher amount"}
      doubleButtonTitle2={"Accept Offer"}
      onPressDoubleButton1={() => {}}
      onPressDoubleButton2={() => {}}
    >
      <View style={styles.image}>
        <Image
          source={require("../../../assets/images/animatedImg.png")}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
        Sorry, Application Not Approved
      </Text>
      <Text
        style={[
          styles.textbox3,
          { color: theme.colors.secondaryText, marginBottom: 30 },
        ]}
      >
        We’re sorry but your request did not go through with the amount of
        45,000 AED.
      </Text>

      <View style={styles.linkTextView}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            You can choose for counter offer or apply for higher limit with our
            team
          </Text>
        </TouchableOpacity>
      </View>
      <MethodSelector
        title="Counter Offer"
        options={methodOptions}
        selectedId={selectedMethod}
        onSelect={(id) => setSelectedMethod(id)}
        titleCenter
      />
    </CustomMainChild>
  );
};

export default NotificationScreen;
