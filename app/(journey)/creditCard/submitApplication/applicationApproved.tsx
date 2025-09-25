import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import DocumentDownload from "@/components/DocumentDownload";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication.Styles";
import { ImagesPath } from "@/constants/Image";
import {
  useCreateWorkItemMutation,
  useOfferLetterMutation,
} from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await offerLetter(formData);
    }
    fetchData();
  }, []);

  const methodOptions = [
    {
      id: t("email"),
      title: t("creditLimit"),
      description: "",
      iconName: "mail-outline",
      amount: formData[fieldNames.cardLimit],
    },
    {
      id: t("sms"),
      title: t("joiningFees2"),
      description: t("weWillbededucted"),
      iconName: "chatbubble-outline",
      amount: formData[fieldNames.cardJoiningFees],
    },
    {
      id: t("app"),
      title: t("annualFees"),
      description: t("stayUpdatedinApp"),
      iconName: "notifications-outline",
      amount: formData[fieldNames.cardAnualFees],
    },
  ];

  const onPressAcceptOffer = async () => {
    console.log("workitem creation");
    // console.log(formData);
    setIsLoading(true);
    const wiCreationResp = await createWorkItem(formData).unwrap();
    console.log("After wi creation");
    console.log("workitem creation resp: " + wiCreationResp.data);
    if (wiCreationResp.status == 200) {
      setValue(fieldNames.workItemNumber, wiCreationResp.data.winame);
      updateField(fieldNames.workItemNumber, wiCreationResp.data.winame);
      router.push("/(journey)/creditCard/submitApplication/congratulations");
    }
    setIsLoading(false);
    // nextStep();
  };

  const theme = useTheme();
  return (
    <CustomMainChild
      title={t("submitApplication")}
      noOfButtons={1}
      singleButtonTitle={t("acceptOffer")}
      onClose={() => router.back()}
      onPressSingleButton={onPressAcceptOffer}
      isLoadingDoubleButton={isLoading}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image}>
          <Image
            source={ImagesPath.approvedIconImage}
            style={styles.successImage}
            resizeMode="contain"
          />
          <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
            {t("applicationApproved")}
          </Text>
          <Text
            style={[
              styles.textbox,
              { color: theme.colors.secondaryText, marginBottom: 30 },
            ]}
          >
            {t("yourApplicationIsApproved")}
          </Text>
        </View>
        <MethodSelector
          title={t("creditCardDetails")}
          options={methodOptions}
          selectedId={selectedMethod}
          onSelect={(id) => setSelectedMethod(id)}
        />
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
           
            source={
              formData[fieldNames.cardType] === t("cashbackCreditCard")
                ? ImagesPath.card2Image
                : formData[fieldNames.cardType] === t("eliteCreditCard")
                ? ImagesPath.card1Image
                : ImagesPath.card3Image
            }
            style={styles.imageSpex}
            resizeMode="contain"
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={[styles.text, { color: theme.colors.borderColor }]}>
          {t("youCanDownload")}
          </Text>
        </View>
        <DocumentDownload
          url={`${process.env.EXPO_PUBLIC_API_URL}/pdfs/UAE-123456/Template.pdf`}
          documentName={t("downloadOfferLetter")}
        />
      </ScrollView>
    </CustomMainChild>
  );
};

export default ApplicationApproved;
