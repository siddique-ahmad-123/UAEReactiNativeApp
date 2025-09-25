import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "@/components/styles/submitApplication4.Styles";
import { ImagesPath } from "@/constants/Image";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
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
      id: t("email"),
      title: t("limitRequired"),
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

  const theme = useTheme();
  return (
    <CustomMainChild
      title={t("submitApplication")}
      noOfButtons={1}
      singleButtonTitle={t("returnToHomePage")}
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => onSubmitApplication()}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image}>
          <Image
            source={ImagesPath.animatedImage}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
          <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
            {t("applicationSubmitted")}
          </Text>
        </View>

        <Text
          style={[
            styles.textbox3,
            { color: theme.colors.secondaryText, marginBottom: 30 },
          ]}
        >
          {t("yourApplicationHasBeenSuccessfullyAccepted")}
          <Text style={{ color: theme.colors.primaryColor }}>
            {formData[fieldNames.selectedRequiredAmount]}
          </Text>
        </Text>

        <View style={styles.linkTextView}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[styles.linktext, { color: theme.colors.primaryColor }]}
            >
              {t("youWillHear")}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            {t("yourApplicationNumberIs")} {formData[fieldNames.workItemNumber]}
          </Text>
        </View>
        <MethodSelector
          title={t("applicationDetails")}
          options={methodOptions}
          selectedId={selectedMethod}
          onSelect={(id) => setSelectedMethod(id)}
          titleCenter
        />
      </ScrollView>
    </CustomMainChild>
  );
};

export default ApplicationNotApproved;
