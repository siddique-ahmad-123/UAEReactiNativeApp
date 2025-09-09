import React from "react";
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from "react-native";
import globalStyles from "./utils";
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
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius._6,
      minWidth: 120,
      minHeight:40
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radius._6,
      minWidth: 174,
      minHeight:58
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
      borderRadius: radius._6,
      minWidth: 189,
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
