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

import { colors } from "@/constants/Colors";

import { styles } from "./Login.Styles";
import CustomButton from "@/components/CustomButton";

const LoginScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.cornerText}>Welcome Back!</Text>
        <Text style={styles.cornerText2}>Signing to your account</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <CustomInput
          label="ID Number"
          placeholder="0000000000"
          secureTextEntry
        />
        <CustomInput
          label="Password"
          placeholder="********"
          secureTextEntry
        />

        <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 20 }}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <CustomButton
            title="Continue as a guest"
            onPress={() => {}}
            variant="secondary"
            type="outlined"
          />
          <CustomButton
            title="Log In"
            onPress={() => router.push("/auth/OTPScreen")}
            variant="primary"
            type="filled"
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
