import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import InfoTile from "@/components/InfoTile/infoTile";
import { styles } from "@/components/styles/submitApplication4.Styles";
import { fontSize, spacing } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

const ApplicationNotApproved = () => {
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();
  const { resetForm, formData } = useApplicationStore();

  const onSubmitApplication = () => {
    resetForm();
    router.push("/(main)/NavScreen");
  };

  const methodOptions = [
    {
      id: "email",
      title: "Limit Required",
      description: "",
      iconName: "wallet",
      amount: formData[fieldNames.cardLimit],
    },
    {
      id: "sms",
      title: "Joining Fees",
      description: "",
      iconName: "cash",
      amount: formData[fieldNames.cardJoiningFees],
    },
    {
      id: "app",
      title: "Annual Fees",
      description: "",
      iconName: "receipt",
      amount: formData[fieldNames.cardAnualFees],
    },
  ];

  const theme = useTheme();
  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={1}
      singleButtonTitle="Return to Home Page"
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => onSubmitApplication()}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image}>
          <Image
            source={require("../../../../assets/images/animatedImg.png")}
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
          Your application has been successfully accepted for AED{" "}
          <Text style={{ color: theme.colors.primaryColor }}>
            {(formData[fieldNames.selectedRequiredAmount] ?? 0).toLocaleString(
              "en-US"
            )}
          </Text>
        </Text>

        <View style={styles.linkTextView}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[styles.linktext, { color: theme.colors.primaryColor }]}
            >
              You’ll hear from our team within 1 day about Credit Card
              application status.
            </Text>
          </TouchableOpacity>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            Your Application No is {formData[fieldNames.workItemNumber]}
          </Text>
        </View>
        <InfoTile
          title="Application Details"
          options={methodOptions}
          selectedId={selectedMethod}
          onSelect={(id) => setSelectedMethod(id)}
          titleCenter
        />
        <View style={{ margin: spacing.md }}>
          <Text style={{ fontStyle: "italic", fontSize: fontSize.xs }}>
            *Joining Fees will be deducted from 1st credit card statement
          </Text>
          <Text style={{ fontStyle: "italic", fontSize: fontSize.xs }}>
            **Annual Fees will be deducted anually from your credit card
          </Text>
        </View>
      </ScrollView>
    </CustomMainChild>
  );
};

export default ApplicationNotApproved;
