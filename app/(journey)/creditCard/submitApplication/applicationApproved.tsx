import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import DocumentDownload from "@/components/DocumentDownload";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication.Styles";
import { useCreateWorkItemMutation } from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const ApplicationApproved = () => {
  const { nextStep, formData, updateField } = useApplicationStore();
  const { setValue } = useForm({
    defaultValues: formData,
  });
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();

  const [createWorkItem] = useCreateWorkItemMutation();

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

  const onPreesAcceptOffer = async () => {
    const wiCreationResp = await createWorkItem(
      formData[fieldNames.mobileNo]
    ).unwrap();

    if (wiCreationResp.status == 200) {
      setValue(fieldNames.workItemNumber, wiCreationResp.data.winame);
      updateField(fieldNames.workItemNumber, wiCreationResp.data.winame);
    }
    nextStep();
  };

  const theme = useTheme();
  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={1}
      singleButtonTitle="Accept Offer"
      onClose={() => router.back()}
      onPressSingleButton={onPreesAcceptOffer}
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
            // source={require(`../../../../assets/images/${cardNumber}.png`)}
            source={
              formData[fieldNames.cardType] === "Cashback Credit Card"
                ? require("../../../../assets/images/card2.png")
                : formData[fieldNames.cardType] === "Elite Credit Card"
                ? require("../../../../assets/images/card1.png")
                : require("../../../../assets/images/card3.png")
            }
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
