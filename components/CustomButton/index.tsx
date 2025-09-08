import React from "react";
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle, StyleSheet } from "react-native";
import globalStyles from "./utils";
import { useTheme } from "@react-navigation/native";
import { radius, spacing, spacingVertical } from "@/constants/Metrics";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
  type?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
   style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  type = "filled",
  size = "md",
  style,
}: Props) {
  let buttonStyle: StyleProp<ViewStyle>;
  let textStyle: StyleProp<TextStyle>;

  // ✅ Base sizing system
  const sizeStyles = {
    sm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius.sm,
      minWidth: 120,
      minHeight:40
    },
    md: {
      paddingVertical: spacingVertical.md,
      paddingHorizontal:spacing.lg,
      borderRadius: radius.md,
      minWidth: 174,
      minHeight:58
    },
    lg: {
      paddingVertical: spacingVertical.md,
      paddingHorizontal: spacing.xs,
      borderRadius: radius.md,
      minWidth: 189,
    },
  };

  const baseStyle = sizeStyles[size];

  if (variant === "primary" && type === "filled") {
    buttonStyle = [globalStyles.button1, baseStyle];
    textStyle = [globalStyles.buttonText];
  } else if (variant === "primary" && type === "outlined") {
    buttonStyle = [globalStyles.outlinedButton, baseStyle];
    textStyle = [globalStyles.outlinedText];
  } else {
    buttonStyle = [globalStyles.outlinedButton, baseStyle];
    textStyle = [globalStyles.buttonText];
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
