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
import { ImagesPath } from "@/constants/Image";
import { t } from "i18next";

const STORAGE_KEY = "user";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const { value: storedUser, storeValue } = useAsyncStorage<{
    emiratesId: string;
    mobile: string;
    userType: string;
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

  const handleLogin = async () => {
    if (!emiratesId.trim()) {
      Alert.alert(t("alertValidationError"));
      return;
    }
    if (!mobile.trim()) {
      Alert.alert(t("alertValidationMobile"));
      return;
    }
    if (mobile.length < 9) {
      Alert.alert(
        t("alertMobileMaxLimit")
      );
      return;
    }
    // handleSetDetails("509876543");
    await storeValue({ emiratesId, mobile, userType });

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
      marginTop: -spacingVertical.xxl,
      padding: spacing.md,
      paddingTop: spacingVertical.xl,
      gap: spacingVertical.md,
    },
    row: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between"
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImagesPath.backgroundImage}
        style={styles.headerBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <Text style={styles.cornerText}>{t("welcome!")}</Text>
        <Text style={styles.cornerText2}>{t("signInToYourAccount")}</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <CustomInput
          label={t("emiratesID")}
          placeholder="0000000000"
          value={emiratesId}
          onChangeText={setEmiratesId}
          maxLength={10}
        />
        <CustomInput
          label={t("mobileNo")}
          placeholder="********"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
          maxLength={9}
        />

        <View style={styles.row}>
          <CustomButton
            title={t("loginWithUAE-PASS")}
            onPress={() => {}}
            variant="secondary"
            type="outlined"
            size="lg"
          />
          <CustomButton
            title={t("sendOtp")}
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
