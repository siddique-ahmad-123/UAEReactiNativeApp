import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { styles } from "@/components/styles/submitApplication2";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
// import { useUserEligibilityCheckMutation } from "@/redux/api/creditCardAPI";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

const Congratulations = () => {
  const theme = useTheme();
  const { formData, resetForm } = useApplicationStore();
  // const [userEligibilityCheck] = useUserEligibilityCheckMutation();
  const onSubmitApplication = async () => {
    // const response = await userEligibilityCheck(formData).unwrap();
    // console.log("✅ Server Response:", response);
    // if (response.status == 200) {
    //   resetForm();
    //   router.replace("/(main)/home");
    // }
     resetForm();
     router.replace("/");
  };
  return (
    <CustomMainChild
      title="Submit Application"
      noOfButtons={1}
      singleButtonTitle="Return to Home Page"
      onClose={() => router.back()}
      onPressSingleButton={() => onSubmitApplication()}
    >
      <View style={styles.image}>
        <Image
          source={require("../../../../assets/images/approved-icon.png")}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
        <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
          Congratulations !!
        </Text>
        <Text
          style={[
            styles.textbox3,
            { color: theme.colors.secondaryText, marginBottom: 30 },
          ]}
        >
          Your Credit Card will be dispatched in 1 day {"\n"} {"\n"} {"\n"}
          You’ll soon receive a confirmation from our side over SMS and Email
          regarding dispatch details.{"\n"} {"\n"} {"\n"}
          {"\n"} Your ‘PIN’ will be available in Mobile App, once the card is
          delivered
        </Text>
      </View>
      <View style={styles.linkTextView}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.linktext, { color: theme.colors.primaryColor }]}>
            Your Application No is {formData[fieldNames.workItemNumber]}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomMainChild>
  );
};

export default Congratulations;
