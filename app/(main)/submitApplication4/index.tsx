import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "../styles/submitApplication4.Styles";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";

const NotificationScreen = () => {
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();
  const { resetForm } = useApplicationStore();

  const onSubmitApplication = ()=>{
      resetForm();
      router.replace("/(main)/home");
  }
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

  const theme = useTheme();
  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={1}
      singleButtonTitle="Return to Home Page"
      onClose={() => router.back()}
      onPressSingleButton={() => onSubmitApplication()}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image}>
          <Image
            source={require("../../../assets/images/amico.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
          <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
            Application Submitted
          </Text>
        </View>

        <Text
          style={[
            styles.textbox3,
            { color: theme.colors.secondaryText, marginBottom: 30 },
          ]}
        >
          We’re sorry but your request did not go through with the amount of
          <Text style={{ color: theme.colors.primaryColor }}>45,000 AED</Text>
        </Text>

        <View style={styles.linkTextView}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[styles.linktext, { color: theme.colors.primaryColor }]}
            >
              You can choose for counter offer or apply for higher limit with
              our team
            </Text>
          </TouchableOpacity>
        </View>
        <MethodSelector
          title="Application Details"
          options={methodOptions}
          selectedId={selectedMethod}
          onSelect={(id) => setSelectedMethod(id)}
          titleCenter
        />
      </ScrollView>
    </CustomMainChild>
  );
};

export default NotificationScreen;
