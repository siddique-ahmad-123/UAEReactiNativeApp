import { radius, spacing } from "@/constants/Metrics";
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "styled-components/native";
import globalStyles from "./utils";

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
  type?: "filled" | "outlined";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isloading?: boolean;
  disabled?:boolean

};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  type = "filled",
  size = "full",
  isloading = false,
  disabled = false,
  style,
  textStyle,
}: Props) {
  const theme = useTheme();
  const sizeglobalStyles: Record<string, ViewStyle> = {
    sm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      minWidth: 120,
      minHeight: 40,
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.md,
      minWidth: 174,
      minHeight: 58,
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
      borderRadius: radius.md,
      minWidth: 189,
    },

    full: {
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      width: "100%",
      minHeight: 54,
      alignSelf: "stretch",
    },
  };

  const baseStyle = sizeglobalStyles[size] || sizeglobalStyles.md;
  let buttonStyle: StyleProp<ViewStyle> = [baseStyle];
  let btnTextStyle: StyleProp<TextStyle>;

  if (variant === "primary" && type === "filled") {
    buttonStyle = [
      globalStyles.button1,
      { backgroundColor: disabled?theme.colors.secondaryLight:theme.colors.secondaryColor },
      baseStyle,
      style,
    ];
    btnTextStyle = [
      globalStyles.buttonText,
      { color: theme.colors.primaryColor },
      textStyle,
    ];
  } else if (variant === "primary" && type === "outlined") {
    buttonStyle = [
      globalStyles.outlinedButton,
      { borderColor: theme.colors.primaryColor },
      { backgroundColor: theme.colors.background },
      baseStyle,
      style,
    ];
    btnTextStyle = [
      globalStyles.outlinedText,
      { color: theme.colors.primaryColor },
      textStyle,
    ];
  } else if (variant === "secondary" && type === "filled") {
    buttonStyle = [
      globalStyles.button2,
      { backgroundColor: theme.colors.background },
      baseStyle,
      style,
    ];
    btnTextStyle = [
      globalStyles.buttonText,
      { color: theme.colors.primaryColor },
      textStyle,
    ];
  } else {
    buttonStyle = [
      globalStyles.outlinedButton,
      { borderColor: theme.colors.primaryColor },
      { backgroundColor: theme.colors.background },
      baseStyle,
      style,
    ];
    btnTextStyle = [
      globalStyles.buttonText,
      { color: theme.colors.primaryColor },
      textStyle,
    ];
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isloading?isloading:disabled}
    >
      {isloading ? (
        <ActivityIndicator color={theme.colors.primaryColor} />
      ) : (
        <Text style={btnTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
