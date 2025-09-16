import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication3.Styles";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

const CounterOffer = () => {
  const theme = useTheme();
  const { prevStep, formData } = useApplicationStore();
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();

  const methodOptions = [
    {
      id: "email",
      title: "Credit Limit",
      description: "",
      iconName: "mail-outline",
      amount: formData[fieldNames.cardLimit],
    },
    {
      id: "sms",
      title: "Joining Fees",
      description: "Will be deducted from 1st credit card installment",
      iconName: "chatbubble-outline",
      amount: formData[fieldNames.cardJoiningFees],
    },
    {
      id: "app",
      title: "Annual Fees",
      description: "Stay updated in the app",
      iconName: "notifications-outline",
      amount: formData[fieldNames.cardAnualFees],
    },
  ];

  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={2}
      onClose={() => router.back()}
      doubleButtonTitle1={"Need higher amount"}
      doubleButtonTitle2={"Accept Offer"}
      onPressDoubleButton1={() => router.push("/(journey)/creditCard/submitApplication/applicationApproved")}
      onPressDoubleButton2={() => router.push("/(journey)/creditCard/submitApplication/congratulations")}
    >
      <View style={styles.image}>
        <Image
          source={require("../../../../assets/images/animatedImg.png")}
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
        {formData[fieldNames.selectedRequiredAmount]} AED.
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

export default CounterOffer;
