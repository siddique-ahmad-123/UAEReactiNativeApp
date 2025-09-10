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
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../CustomButton";

interface FormHeaderProps {
  onSaveAndBack: () => void;
  children?: React.ReactNode;
}

export default function FormSummaryLayout({
  onSaveAndBack,
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
    <ScreenWrapper>
      <View style={styles.container}>
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
              title="Save & Back"
              onPress={onSaveAndBack}
              variant="primary"
              type="filled"
              size="lg"
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
