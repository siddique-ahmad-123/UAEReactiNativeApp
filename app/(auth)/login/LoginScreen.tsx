import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./Login.Styles";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

const LoginScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/background.png")}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.cornerText}>Welcome Back!</Text>
        <Text style={styles.cornerText2}>Signing to your account</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <CustomInput
          label="Emirates ID"
          placeholder="0000000000"
          secureTextEntry
        />
        <CustomInput
          label="Mobile No"
          placeholder="********"
          secureTextEntry
        />

        {/* <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 20 }}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity> */}

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
            onPress={() => router.push("/(auth)/otp/otpScreen")}
            variant="primary"
            type="filled"
            size="lg"
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
