import React from "react";
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from "react-native";
import globalStyles from "./utils";
import { radius } from "@/constants/Metrics";
import { spacing } from "@/constants/Spacing";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
  type?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  type = "filled",
  size = "md",
}: Props) {
  let buttonStyle: StyleProp<ViewStyle>;
  let textStyle: StyleProp<TextStyle>;

  // ✅ Base sizing system
  const sizeStyles = {
    sm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius._6,
      minWidth: 120,
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radius._12,
      minWidth: 152,
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
      borderRadius: radius._6,
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
