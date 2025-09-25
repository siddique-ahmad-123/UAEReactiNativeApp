import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { styles } from "@/components/styles/submitApplication2";
import { ImagesPath } from "@/constants/Image";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
//import { useUserEligibilityCheckMutation } from "@/redux/api/creditCardAPI";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

const Congratulations = () => {
  const theme = useTheme();
  const { formData, resetForm } = useApplicationStore();

  //const [userEligibilityCheck] = useUserEligibilityCheckMutation();
  const onSubmitApplication = async () => {
    // const response = await userEligibilityCheck(formData).unwrap();
    // console.log("✅ Server Response:", response);
    // if (response.status == 200) {
    //   resetForm();
    //   router.replace("/(main)/home");
    // }
     resetForm();
     router.replace("/(main)/NavScreen");
  };
  return (
    <CustomMainChild
      title={t("submitApplication")}
      noOfButtons={1}
      singleButtonTitle={t("returnToHomePage")}
      onClose={() => router.push("/(main)/NavScreen")}
      onPressSingleButton={() => onSubmitApplication()}
    >
      <View style={styles.image}>
        <Image
          source={ImagesPath.approvedIconImage}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
        <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
          {t("congratulations")}
        </Text>
        <Text
          style={[
            styles.textbox3,
            { color: theme.colors.secondaryText, marginBottom: 30 },
          ]}
        >
          {t("yourCreditCardWillBeDispatched")}
        </Text>
      </View>
      <View style={styles.linkTextView}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            {t("yourApplicationNumberIs")} {formData[fieldNames.workItemNumber]}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomMainChild>
  );
};

export default Congratulations;
