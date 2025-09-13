import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";
import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton"; // 👈 import your custom button

const OTPScreen: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];

    if (text.length > 1) {
      text.split("").forEach((char, i) => {
        if (index + i < newOtp.length) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);

      const nextIndex = newOtp.findIndex((d) => d === "");
      if (nextIndex !== -1) {
        inputRefs[nextIndex].current?.focus();
      }
      return;
    }

    newOtp[index] = text;
    setOtp(newOtp);

    if (text) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    } else {
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const theme = useTheme();
  const allFilled = otp.every((digit) => digit !== ""); // 👈 check if OTP is complete

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
      marginTop: -spacingVertical.xl,
      padding: spacing.md,
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
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
        source={require("../../../assets/images/background.png")}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
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
        <Text style={styles.sectionTitle}>Enter Verification Code</Text>
        <Text style={styles.sectionSubtitle}>
          {allFilled
            ? "We are automatically detecting an SMS sent to your mobile number *****7412"
            : "we have sent a SMS to your mobile number*****7412"}
        </Text>
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.otpBox,
                { backgroundColor: digit ? theme.colors.primaryColor : theme.colors.primaryLightColor },
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
        {allFilled && (
          <CustomButton
            title="Continue"
            size="full"
            variant="primary"
            type="filled"
            onPress={() => router.push("/NavScreen")}
            style={{marginTop:230}}
          />
        )}
      </View>
    </View>
  );
};

export default OTPScreen;
