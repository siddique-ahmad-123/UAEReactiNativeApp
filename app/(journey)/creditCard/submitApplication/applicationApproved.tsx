import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import DocumentDownload from "@/components/DocumentDownload";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication.Styles";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View
} from "react-native";
import { useTheme } from "styled-components/native";

const ApplicationApproved = () => {
  const { nextStep } = useApplicationStore();
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

  const theme = useTheme();
  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={1}
      singleButtonTitle="Accept Offer"
      onClose={() => router.back()}
      onPressSingleButton={() => nextStep()}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image}>
          <Image
            source={require("../../../../assets/images/approved-icon.png")}
            style={styles.successImage}
            resizeMode="contain"
          />
          <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
            Application Approved
          </Text>
          <Text
            style={[
              styles.textbox,
              { color: theme.colors.secondaryText, marginBottom: 30 },
            ]}
          >
            Your application is approved successfully
          </Text>
        </View>
        <MethodSelector
          title="Credit Card Details"
          options={methodOptions}
          selectedId={selectedMethod}
          onSelect={(id) => setSelectedMethod(id)}
        />
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
            source={require("../../../../assets/images/card3.png")}
            style={styles.imageSpex}
            resizeMode="contain"
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={[styles.text, { color: theme.colors.borderColor }]}>
            You can download your offer letter from below
          </Text>
        </View>
        <DocumentDownload url={""} documentName="Download Offer Letter" />
      </ScrollView>
    </CustomMainChild>
  );
};

export default ApplicationApproved;
