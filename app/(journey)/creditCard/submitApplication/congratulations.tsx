import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";
import { styles } from "@/app/(main)/styles/submitApplication2";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { useUserEligibilityCheckMutation } from "@/redux/api/creditCardAPI";

const Congratulations = () => {
  const theme = useTheme();
  const { formData, resetForm } = useApplicationStore();
  const [userEligibilityCheck] = useUserEligibilityCheckMutation();
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
            Your Application No is RLOS_CC_1234
          </Text>
        </TouchableOpacity>
      </View>
    </CustomMainChild>
  );
};

export default Congratulations;
