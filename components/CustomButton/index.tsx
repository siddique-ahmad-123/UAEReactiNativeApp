import React from "react";
import { Text, TouchableOpacity } from "react-native";
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
  let buttonStyle;
  let textStyle;

  const baseStyle = {
     paddingVertical:
      size === "sm"
        ? spacing.xs
        : size === "lg"
        ? spacing.lg
        : spacing.md,

    paddingHorizontal: spacing.lg,

    borderRadius:
      size === "sm"
        ? radius._6
        : size === "lg"
        ? radius._17
        : radius._12,
  };

  if (variant === "primary" && type === "filled") {
    buttonStyle = [globalStyles.button1, baseStyle];
    textStyle = globalStyles.buttonText;
  } else if (variant === "primary" && type === "outlined") {
    buttonStyle = [globalStyles.outlinedButton, baseStyle];
    textStyle = globalStyles.outlinedText;
  } else {
    buttonStyle = [globalStyles.outlinedButton, baseStyle]; 
    textStyle = globalStyles.buttonText;
  }

  return (
    <TouchableOpacity style={[baseStyle, buttonStyle]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
