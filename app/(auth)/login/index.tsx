import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useTheme } from "styled-components/native";
import { fontSize, fontWeight, radius, spacing, spacingVertical } from "@/constants/Metrics";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: theme.colors.background },

    headerBackground: {
      width: "110%",
      height: 300,
      justifyContent: "flex-end",
      padding:spacing.md,
      paddingBottom:spacingVertical.xxxl
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
      fontWeight:fontWeight.bold,
      color: theme.colors.textHeader,
    },

    cornerText2: {
      fontSize: fontSize.lg,
      fontWeight:fontWeight.normal,
      color: theme.colors.textHeader,    },

    formContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: radius.pill,
      borderTopRightRadius: radius.pill,
      marginTop: -spacingVertical.xl,
      padding:spacing.md,
      gap: spacingVertical.md,
    },

    forgotPassword: { fontSize: 14, color: "text" },

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
        <Text style={styles.cornerText}>Welcome Back!</Text>
        <Text style={styles.cornerText2}>Signing to your account</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <CustomInput
          label="Emirates ID"
          placeholder="0000000000"
          secureTextEntry
        />
        <CustomInput label="Mobile No" placeholder="********" secureTextEntry />

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
            onPress={() => router.push("/(auth)/otp")}
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
