import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import InfoTile from "@/components/InfoTile/infoTile";
import { styles } from "@/components/styles/submitApplication3.Styles";
import { fontSize, spacing } from "@/constants/Metrics";
import { useCreateWorkItemMutation } from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

const CounterOffer = () => {
  const theme = useTheme();
  const { nextStep, formData, updateField } = useApplicationStore();
  const { setValue } = useForm({
    defaultValues: formData,
  });
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();

  const [createWorkItem] = useCreateWorkItemMutation();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onPressNeedHigherLimit = async () => {
    setLoading1(true);
    const wiCreationResp = await createWorkItem(formData).unwrap();
    if (wiCreationResp.status == 200) {
      setValue(fieldNames.workItemNumber, wiCreationResp.data.winame);
      updateField(fieldNames.workItemNumber, wiCreationResp.data.winame);
      router.push("/(journey)/creditCard/submitApplication/congratulations");
    }
    setLoading1(false);
    router.push(
      "/(journey)/creditCard/submitApplication/applicationNotApproved"
    );
  };

  const onPressAcceptOffer = async () => {
    setLoading2(true);
    const wiCreationResp = await createWorkItem(formData).unwrap();
    if (wiCreationResp.status == 200) {
      setValue(fieldNames.workItemNumber, wiCreationResp.data.winame);
      updateField(fieldNames.workItemNumber, wiCreationResp.data.winame);
      router.push("/(journey)/creditCard/submitApplication/congratulations");
    }
    setLoading2(false);
    router.push("/(journey)/creditCard/submitApplication/congratulations");
  };

  const methodOptions = [
    {
      id: "email",
      title: "Credit Limit",
      description: "",
      iconName: "wallet",
      amount: formData[fieldNames.cardLimit],
    },
    {
      id: "sms",
      title: "Joining Fees*",
      description: "",
      iconName: "cash",
      amount: formData[fieldNames.cardJoiningFees],
    },
    {
      id: "app",
      title: "Annual Fees**",
      description: "",
      iconName: "receipt",
      amount: formData[fieldNames.cardAnualFees],
    },
  ];

  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={2}
      onClose={() => router.back()}
      doubleButtonTitle1={"Need higher Limit"}
      doubleButtonTitle2={"Accept Offer"}
      isLoadingSingleButton={loading1}
      onPressDoubleButton1={onPressNeedHigherLimit}
      isLoadingDoubleButton={loading2}
      onPressDoubleButton2={onPressAcceptOffer}
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
      <Text style={[styles.textbox3, { color: theme.colors.secondaryText }]}>
        We’re sorry but your request did not go through with the amount of{" "}
        {Number(formData[fieldNames.selectedRequiredAmount]).toLocaleString(
          "en-US"
        )}{" "}
        AED.
      </Text>

      <View style={styles.linkTextView}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            You can choose for counter offer or apply for higher limit with our
            team
          </Text>
        </TouchableOpacity>
      </View>
      <InfoTile
        title="Counter Offer"
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
    </CustomMainChild>
  );
};

export default CounterOffer;
