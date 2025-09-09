import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./otp.Styles";
import { useTheme } from "styled-components/native";


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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/background.png")}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
      
        <View style={styles.overlay} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back(); 
          }}
        >
          <Text style={styles.backArrow}>&lt;</Text>
        </TouchableOpacity>

        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.cornerText}>Verify OTP</Text>
        <Text style={styles.cornerText2}>Enter your OTP</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Enter Verification Code</Text>
        <Text style={styles.sectionSubtitle}>
          We are automatically detecting an SMS sent to your mobile number
          *****7412
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.otpBox,
                { backgroundColor: digit ? "#3F1956" : "#F3E9F6" },
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
              selectionColor={digit ? theme.colors.background : theme.colors.background }
              placeholderTextColor={digit ? theme.colors.background : "#000"}
            />
          ))}
        </View>

        <Text style={styles.resendLabel}>Did not receive the code?</Text>
        <TouchableOpacity onPress={() => router.push("/NavScreen")}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
        <Text style={styles.timer}>02:00</Text>
      </View>
    </View>
  );
};



export default OTPScreen;
