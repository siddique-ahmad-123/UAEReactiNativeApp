import { FormHeader } from "@/components/Form/Header/FormHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import {
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { useTheme } from "styled-components/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
interface FormHeaderProps {
  stepNumber: number;
  title: string;
  subTitle: string;
  noOfBars: number;
  activeBarIndex: number;
  onBack: () => void;
  onClose: () => void;
  onInfoPress?: () => void;
  onSaveAndNext: () => void;
  children?: React.ReactNode;
}
export default function FormLayout({
  stepNumber,
  title,
  subTitle,
  noOfBars,
  activeBarIndex,
  onBack,
  onClose,
  onInfoPress,
  onSaveAndNext,
  children,
}: FormHeaderProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.primaryColor },
    scrollViewConatiner: {
      borderTopRightRadius: radius.pill,
      borderTopLeftRadius: radius.pill,
      backgroundColor: theme.colors.background,
      flex: 1,
      overflow: "hidden",
    },
    scrollView: {
      padding: spacing.md,
      gap: spacingVertical.sm,
    },

    buttonRow: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
      marginVertical: spacingVertical.md,
    },
    actionButton: {
      flex: 1,
      paddingVertical: spacingVertical.md,
      borderRadius: radius.md,
      alignItems: "center",
    },
    backButton: {
      borderWidth: 1,
      borderColor: theme.colors.primaryColor,
      marginRight: spacing.sm,
    },
    nextButton: {
      backgroundColor: theme.colors.secondaryColor,
      marginLeft: spacing.sm,
    },
    backButtonText: {
      color: theme.colors.primaryColor,
      fontWeight: fontWeight.semiBold,
    },
    nextButtonText: {
      color: theme.colors.primaryColor,
      fontWeight: fontWeight.semiBold,
    },
  });

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <FormHeader
          stepNumber={stepNumber}
          title={title}
          subTitle={subTitle}
          noOfBars={noOfBars}
          activeBarIndex={activeBarIndex}
          onBack={onBack}
          onClose={onClose}
          onInfoPress={onInfoPress}
        />
        <View style={styles.scrollViewConatiner}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollView}
            extraScrollHeight={spacingVertical.xxxxl}
            enableOnAndroid
          >
            {children}
            {/* Footer Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.backButton]}
                onPress={onBack}
              >
                <Text style={styles.backButtonText}>{t("back")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.nextButton]}
                onPress={onSaveAndNext}
              >
                <Text style={styles.nextButtonText}>{t("saveAndNext")}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
}
