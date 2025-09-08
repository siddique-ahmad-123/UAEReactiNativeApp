import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import globalStyles from "./utils"; // your global styles
import { radius } from "@/constants/Metrics";
import { spacing } from "@/constants/Spacing";

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
  type?: "filled" | "outlined";
  size?: "sm" | "md" | "lg" | "xl" | "full"; // ✅ added full
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  type = "filled",
  size = "md",
  style,
  textStyle,
}: Props) {
  // ✅ Sizing system
  const sizeStyles: Record<string, ViewStyle> = {
    sm: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      minWidth: 60,
      minHeight: 28,
      alignSelf: "flex-start",
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radius._6,
      minWidth: 160,
      minHeight: 48,
      alignSelf: "center",
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius._6,
      minWidth: 200,
      minHeight: 56,
      alignSelf: "center",
    },
    xl: {
      paddingVertical: spacing.lg,
      borderRadius: radius._6,
      width: "90%",
      minHeight: 64,
      alignSelf: "center",
    },
    full: {
      paddingVertical: spacing.lg,
      borderRadius: radius._6,
      width: "100%", // ✅ takes full width
      minHeight: 34,
      alignSelf: "stretch",
    },
  };

  const baseStyle = sizeStyles[size] || sizeStyles.md;

  // ✅ Variant + Type
  let buttonStyle: StyleProp<ViewStyle> = [baseStyle];
  let btnTextStyle: StyleProp<TextStyle>;

  if (variant === "primary" && type === "filled") {
    buttonStyle = [globalStyles.button1, baseStyle, style];
    btnTextStyle = [globalStyles.buttonText, textStyle];
  } else if (variant === "primary" && type === "outlined") {
    buttonStyle = [globalStyles.outlinedButton, baseStyle, style];
    btnTextStyle = [globalStyles.outlinedText, textStyle];
  } else if (variant === "secondary" && type === "filled") {
    buttonStyle = [globalStyles.button2, baseStyle, style];
    btnTextStyle = [globalStyles.buttonText, textStyle];
  } else {
    buttonStyle = [globalStyles.outlinedButton, baseStyle, style];
    btnTextStyle = [globalStyles.buttonText, textStyle];
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={btnTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
