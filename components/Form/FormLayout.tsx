import { FormHeader } from "@/components/Form/Header/FormHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { useTheme } from "styled-components/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../CustomButton";

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
    scrollViewContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderTopRightRadius: radius.pill,
      borderTopLeftRadius: radius.pill,
      overflow:"hidden"
    },
    scrollViewContent: {
      padding: spacing.md,
      paddingBottom: spacingVertical.xl, // give room at bottom for keyboard
      gap: spacingVertical.md,
    },
    buttonRow: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
      paddingHorizontal: spacing.md,
      paddingVertical: spacingVertical.md,
      backgroundColor: theme.colors.background,
    },
  });

  return (
      <View style={styles.container}>
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
        <View style={styles.scrollViewContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContent}
            enableOnAndroid
            extraScrollHeight={40} // smart smaller offset
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </KeyboardAwareScrollView>

          {/* Footer stays pinned outside scroll */}
          <View style={styles.buttonRow}>
            <CustomButton
              title="Back"
              onPress={onBack}
              variant="secondary"
              type="outlined"
              size="md"
            />
            <CustomButton
              title="Save & Next"
              onPress={onSaveAndNext}
              variant="primary"
              type="filled"
              size="md"
            />
          </View>
        </View>
      </View>
  );
}
