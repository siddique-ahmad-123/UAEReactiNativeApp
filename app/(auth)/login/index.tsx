import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { useGetExistingCustomerDataMutation } from "@/redux/api/creditCardAPI";
import { customerDataMapper } from "@/schemas/burrowerDataMapper";
import { useForm } from "react-hook-form";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";

const STORAGE_KEY = "user";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const { setValue } = useForm({
    defaultValues: fieldNames,
  });

  const { value: storedUser, storeValue } = useAsyncStorage<{
    emiratesId: string;
    mobile: string;
    userType:string;
  }>(STORAGE_KEY);

  const [emiratesId, setEmiratesId] = useState("");
  const [mobile, setMobile] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (storedUser) {
      router.replace({
        pathname: "/(auth)/otp",
        params: { mobile: storedUser.mobile, otp: "1234" },
      });
    }
  }, [storedUser]);

  //const [getExistingCustomerData] = useGetExistingCustomerDataMutation();

  // const handleSetDetails = async (mobileNo: string) => {
  //   try {
  //     const response = await getExistingCustomerData(mobileNo).unwrap();

  //     if (response.status === 200) {

  //       const customer = response.data.customerData[0];

  //       if(customer.length == 0){
  //           setUserType("NTB");
  //       }
  //       else{
  //         setUserType("ETB");
  //       }

  //       setValue(fieldNames.borrowerName, customer.Name);
  //       setValue(fieldNames.borrowerName, customer.Name);
  //       setValue(fieldNames.borrowerDOB, customer.DOB);
  //       setValue(fieldNames.borrowerGender, customer.Gender);
  //       setValue(fieldNames.borrowerNationality, customer.Nationality);
  //       setValue(
  //         fieldNames.borrowerResidenceCountry,
  //         customer["Residence Country"]
  //       );

  //       setValue(fieldNames.borrowerEidaNo, customer.EIDA_No);
  //       setValue(fieldNames.borrowerEidaIssueDate, customer.EIDA_Issue_Date);
  //       setValue(fieldNames.borrowerEidaExpiryDate, customer.EIDA_Expiry_Date);

  //       setValue(fieldNames.borrowerPassportNo, customer.Passport_No);
  //       setValue(
  //         fieldNames.borrowerPassportIssueDate,
  //         customer.Passport_Issue_Date
  //       );
  //       setValue(
  //         fieldNames.borrowerPassportExpiryDate,
  //         customer.Passport_Expiry_Date
  //       );

  //       setValue(fieldNames.borrowerVisaNo, customer.Visa_No);
  //       setValue(fieldNames.borrowerVisaIssueDate, customer.Visa_Issue_Date);
  //       setValue(fieldNames.borrowerVisaExpiryDate, customer.Visa_Expiry_Date);

  //       setValue(fieldNames.borrowerEmailId, customer.Email_ID);
  //       setValue(fieldNames.borrowerMobileNo, customer.Mobile_No);

  //       setValue(fieldNames.borrowerAddressLine1, customer.Address_Line_1);
  //       setValue(fieldNames.borrowerAddressLine2, customer.Address_Line_2);
  //       setValue(fieldNames.borrowerEmirates, customer.Emirates);
  //       setValue(fieldNames.borrowerCountry, customer.Country);
  //     }
  //   } catch (error) {
  //     console.log(" Error fetching customer data", error);
  //   }
  // };

  const handleLogin = async () => {
    if (!emiratesId.trim()) {
      Alert.alert("Validation Error", "Please enter your Emirates ID");
      return;
    }
    if (!mobile.trim()) {
      Alert.alert("Validation Error", "Please enter your Mobile Number");
      return;
    }
    if (mobile.length < 9) {
      Alert.alert(
        "Validation Error",
        "Mobile number must be at least 10 digits"
      );
      return;
    }
   // handleSetDetails("509876543");
    await storeValue({ emiratesId, mobile, userType});

    router.push({
      pathname: "/(auth)/otp",
      params: { mobile, otp: "1234" },
    });
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    headerBackground: {
      width: "110%",
      height: 300,
      justifyContent: "flex-end",
      padding: spacing.md,
      paddingBottom: spacingVertical.xxxl,
    },
    imageStyle: {
      opacity: 1,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    cornerText: {
      fontSize: fontSize.xxl,
      fontWeight: fontWeight.bold,
      color: theme.colors.textHeader,
    },
    cornerText2: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.normal,
      color: theme.colors.textHeader,
    },
    formContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: radius.pill,
      borderTopRightRadius: radius.pill,
      marginTop: -spacingVertical.xl,
      padding: spacing.md,
      paddingTop: spacingVertical.xl,
      gap: spacingVertical.md,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/background.png")}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <Text style={styles.cornerText}>Welcome !!</Text>
        <Text style={styles.cornerText2}>Sign in to your account</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <CustomInput
          label="Emirates ID"
          placeholder="0000000000"
          value={emiratesId}
          onChangeText={setEmiratesId}
          maxLength={10}
        />
        <CustomInput
          label="Mobile No"
          placeholder="********"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
          maxLength={9}
        />

        <View style={styles.row}>
          <CustomButton
            title="Login with UAE-PASS"
            onPress={() => {}}
            variant="secondary"
            type="outlined"
            size="lg"
          />
          <CustomButton
            title="Send OTP"
            onPress={handleLogin}
            variant="primary"
            type="filled"
            size="lg"
            disabled={mobile.trim().length < 9}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
