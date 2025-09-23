import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication3.Styles";
import { ImagesPath } from "@/constants/Image";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
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
      id: t("email"),
      title: t("creditLimit"),
      description: "",
      iconName: "mail-outline",
      amount: formData[fieldNames.cardLimit],
    },
    {
      id: t("sms"),
      title: t("joiningFees"),
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

  return (
    <CustomMainChild
      title={t("submitApplication")}
      noOfButtons={2}
      onClose={() => router.back()}
      doubleButtonTitle1={t("needHigherAmount")}
      doubleButtonTitle2={t("acceptOffer")}
      onPressDoubleButton1={() => router.push("/(journey)/creditCard/submitApplication/applicationNotApproved")}
      onPressDoubleButton2={() => router.push("/(journey)/creditCard/submitApplication/congratulations")}
    >
      <View style={styles.image}>
        <Image
          source={ImagesPath.animatedImage}
          style={{ width: 200, height: 200 }}
        resizeMode="contain"
        />
      </View>
      <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
        {t("sorryApplicationNotApproved")}
      </Text>
      <Text
        style={[
          styles.textbox3,
          { color: theme.colors.secondaryText, marginBottom: 30 },
        ]}
      >
        {t("weAreSorryButYourRequestThrough")} {formData[fieldNames.selectedRequiredAmount]} AED.
      </Text>

      <View style={styles.linkTextView}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            {t("youCanChooseForCounter")}
          </Text>
        </TouchableOpacity>
      </View>
      <MethodSelector
        title={t("counterOffer")}
        options={methodOptions}
        selectedId={selectedMethod}
        onSelect={(id) => setSelectedMethod(id)}
        titleCenter
      />
    </CustomMainChild>
  );
};

export default CounterOffer;
