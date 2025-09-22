import CustomButton from "@/components/CustomButton";
import { ImagesPath } from "@/constants/Image";
import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { useAsyncStorage } from "@/hooks/useAsyncStorage"; // ✅ corrected import
import { useGetExistingCustomerDataMutation } from "@/redux/api/creditCardAPI";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";

const STORAGE_KEY = "user";

const OTPScreen: React.FC = () => {
  const router = useRouter();
  const correctOtp = "1234";

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [getExistingCustomerData] = useGetExistingCustomerDataMutation();
  const [isloading, setIsLoading] = useState(false);
  const { value: storedUser, storeValue } = useAsyncStorage<{
    emiratesId: string;
    mobile: string;
    userType: string;
    name: string;
  }>(STORAGE_KEY);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otpDigits];

    // Handle paste of multiple digits
    if (text.length > 1) {
      text.split("").forEach((char, i) => {
        if (index + i < newOtp.length) {
          newOtp[index + i] = char;
        }
      });
      setOtpDigits(newOtp);
      const nextIndex = newOtp.findIndex((d) => d === "");
      if (nextIndex !== -1) {
        inputRefs[nextIndex].current?.focus();
      }
      return;
    }

    // Normal typing
    newOtp[index] = text;
    setOtpDigits(newOtp);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    } else if (!text && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    const enteredOtp = otpDigits.join("");
    if (enteredOtp === correctOtp) {
      if (
        storedUser &&
        (storedUser.userType === "ETB" || storedUser.userType === "NTB")
      ) {
        // user already has type stored, do nothing
        router.replace("/NavScreen");
      } else {
        console.log(storedUser?.mobile);
        const response: any = await getExistingCustomerData(
          storedUser?.mobile || "509876543"
        ).unwrap();
        console.log("api hit" + response);
        if (response.status === 200) {
          let userType = "NTB";
          let userName = "Guest";
          if (
            response.data &&
            Object.keys(response.data.customerData).length > 0
          ) {
            userType = "ETB";

            userName = response.data.customerData[0]?.Name || "Ravish Kumar";
          }

          storeValue({
            userType: userType,
            name: userName,
            emiratesId: storedUser?.emiratesId || "",
            mobile: storedUser?.mobile || "509876543",
          });
          router.replace("/NavScreen");
        } else {
          alert("Something went wrong!!");
        }
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const theme = useTheme();
  const allFilled = otpDigits.every((digit) => digit !== "");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
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
      marginTop: -spacingVertical.xxl,
      padding: spacing.md,
      justifyContent:"space-between"
    },
    formContainerChild: {
      flex: 1,
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: fontSize.xxl,
      fontWeight: fontWeight.medium,
      color: theme.colors.primaryColor,
      marginBottom: 10,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: "#B8B8B8",
      textAlign: "center",
      marginBottom: 20,
    },
    otpRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 319,
      height: 62,
      marginVertical: 20,
    },
    otpBox: {
      width: 61,
      height: 62,
      borderRadius: 19,
      fontSize: 32,
      fontWeight: "700",
      color: "#fff",
    },
    backButton: {
      position: "absolute",
      top: 40,
      left: spacing.md,
      zIndex: 10,
    },
    resendLabel: { color: "#B8B8B8", marginTop: 10 },
    resendText: { color: "#3F1956", fontWeight: "700", marginTop: 5 },
    timer: { marginTop: 5, color: "#B8B8B8" },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImagesPath.backgroundImage}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            style={{ color: theme.colors.statusBarText }}
          />
        </TouchableOpacity>
        <Text style={styles.cornerText}>Verify OTP</Text>
        <Text style={styles.cornerText2}>Enter your OTP</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.formContainerChild}>
          <Text style={styles.sectionTitle}>Enter Verification Code</Text>
          <Text style={styles.sectionSubtitle}>
            {allFilled
              ? "We are automatically detecting an SMS sent to your mobile number *****7412"
              : "We have sent an SMS to your mobile number *****7412"}
          </Text>

          <View style={styles.otpRow}>
            {otpDigits.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={[
                  styles.otpBox,
                  {
                    backgroundColor: digit
                      ? theme.colors.primaryColor
                      : theme.colors.primaryLightColor,
                  },
                ]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                autoFocus={index === 0}
                selectionColor={theme.colors.background}
                placeholderTextColor={digit ? theme.colors.background : "#000"}
              />
            ))}
          </View>

          <Text style={styles.resendLabel}>Did not receive the code?</Text>
          <Text style={styles.resendText}>Resend Code</Text>
          <Text style={styles.timer}>02:00</Text>
        </View>

        <View  style={{ marginBottom: spacingVertical.lg }}>
        {allFilled && (
          <CustomButton
            title="Continue"
            size="full"
            variant="primary"
            type="filled"
            onPress={handleVerify}
            isloading={isloading}
          />
        )}
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;
