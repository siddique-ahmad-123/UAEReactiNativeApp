import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import CustomButton from "../CustomButton";

interface FormHeaderProps {
  title: string;
  subTitle?: string;
  onClose?: () => void;
  noOfButtons?: number;
  singleButtonTitle?: string;
  doubleButtonTitle1?: string;
  doubleButtonTitle2?: string;
  onPressSingleButton?: () => void;
  onPressDoubleButton1?: () => void;
  onPressDoubleButton2?: () => void;
  isDisableDoubleButton2?: boolean;
  children?: React.ReactNode;
  disableOuterScroll?: boolean;
  isLoadingDoubleButton?: boolean;
  isLoadingSingleButton?: boolean;
}
const CustomMainChild = ({
  title,
  subTitle,
  onClose,
  noOfButtons,
  singleButtonTitle,
  doubleButtonTitle1,
  doubleButtonTitle2,
  onPressSingleButton,
  onPressDoubleButton1,
  onPressDoubleButton2,
  isDisableDoubleButton2 = false,
  children,
  disableOuterScroll = false,
  isLoadingDoubleButton = false,
  isLoadingSingleButton = false,
}: FormHeaderProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primaryColor,
    },
    header: {
      padding: spacing.md,
      gap: spacingVertical.xs,
    },
    titleContainer: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      color: theme.colors.statusBarText,
      fontWeight: fontWeight.medium,
      fontSize: fontSize.lg,
      marginRight: spacing.sm,
    },
    iconButton: {
      paddingHorizontal: spacing.xs,
      alignSelf: "center",
    },
    subTitle: {
      color: theme.colors.statusBarText,
      fontWeight: fontWeight.medium,
      fontSize: fontSize.xs,
      marginRight: spacing.sm,
    },
    dataViewContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderTopRightRadius: radius.pill,
      borderTopLeftRadius: radius.pill,
      justifyContent: "space-between",
      overflow: "hidden",
    },
    fixedViewContainer: {
      flex: 1,
      padding: spacing.md,
      justifyContent: "space-between",
      gap: spacingVertical.md,
    },
    scrollViewContainer: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {onClose && (
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
              <Ionicons
                name="close"
                size={30}
                color={theme.colors.textHeader}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.dataViewContainer}>
        {disableOuterScroll ? (
          // no outer ScrollView — just a container; carousel will handle inner scrolling
          <View style={styles.fixedViewContainer}>{children}</View>
        ) : (
          <ScrollView
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        )}
        {/* Footer stays pinned outside scroll */}
        {(noOfButtons === 1 || noOfButtons === 2) && (
          <View style={styles.buttonRow}>
            {noOfButtons === 1 && (
              <CustomButton
                title={singleButtonTitle ? singleButtonTitle : ""}
                onPress={() => {
                  if (onPressSingleButton) {
                    onPressSingleButton();
                  }
                }}
                variant="primary"
                type="filled"
                size="full"
                isloading={isLoadingSingleButton}
              />
            )}
            {noOfButtons === 2 && (
              <>
                <CustomButton
                  title={doubleButtonTitle1 ? doubleButtonTitle1 : ""}
                  onPress={() => {
                    if (onPressDoubleButton1) {
                      onPressDoubleButton1();
                    }
                  }}
                  variant="secondary"
                  type="outlined"
                  size="md"
                />
                <CustomButton
                  title={doubleButtonTitle2 ? doubleButtonTitle2 : ""}
                  disabled={isDisableDoubleButton2}
                  onPress={() => {
                    if (onPressDoubleButton2) {
                      onPressDoubleButton2();
                    }
                  }}
                  isloading={isLoadingDoubleButton}
                  variant="primary"
                  type="filled"
                  size="md"
                />
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomMainChild;
