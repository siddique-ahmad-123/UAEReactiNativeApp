import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import DocumentDownload from "@/components/DocumentDownload";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication.Styles";
import {
  useCreateWorkItemMutation,
  useOfferLetterMutation,
} from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [offerLetter] = useOfferLetterMutation();
 

  useEffect(() => {
    async function fetchData() {
      await offerLetter(formData);
    }
    fetchData();
  }, []);



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
      description: "",
      iconName: "chatbubble-outline",
      amount: formData[fieldNames.cardJoiningFees],
    },
    {
      id: "app",
      title: "Annual Fees",
      description: "",
      iconName: "notifications-outline",
      amount: formData[fieldNames.cardAnualFees],
    },
  ];

  const onPressAcceptOffer = async () => {
    
    console.log("workitem creation");
    // console.log(formData);
   
    
    const wiCreationResp = await createWorkItem(formData).unwrap();
    console.log("After wi creation");
    console.log("workitem creation resp: " + wiCreationResp.data);
    if (wiCreationResp.status == 200) {
      setValue(fieldNames.workItemNumber, wiCreationResp.data.winame);
      updateField(fieldNames.workItemNumber, wiCreationResp.data.winame);
      router.push("/(journey)/creditCard/submitApplication/congratulations");
    }
    
    // nextStep();
  };

  const theme = useTheme();
  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={1}
      singleButtonTitle="Accept Offer"
      onClose={() => router.back()}
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
          titleCenter
        />
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
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
        <DocumentDownload
          url={`${process.env.EXPO_PUBLIC_API_URL}/pdfs/UAE-123456/Template.pdf`}
          documentName="Download Offer Letter"
        />
      </ScrollView>
    </CustomMainChild>
  );
};

export default ApplicationApproved;
