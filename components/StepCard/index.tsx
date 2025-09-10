import {
  borderWidth,
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingExtra,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

interface StepCardProps {
  stepNumber: number;
  label: string;
  completed?: boolean;
  path: string;
}

const StepCard = ({
  stepNumber,
  label,
  completed = false,
  path,
}: StepCardProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      borderRadius: radius.lg,
      paddingVertical: spacingVertical.md,
      paddingHorizontal: spacing.md,
      elevation: 2,
    },
    stepBox: {
      backgroundColor: theme.colors.secondaryColor,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacingVertical.xs,
      marginRight: spacing.sm,
    },
    stepText: {
      fontWeight: fontWeight.semiBold,
      color: theme.colors.primaryColor,
    },
    label: {
      flex: 1,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
      color: theme.colors.textPrimary,
    },
    statusCircle: {
      width: spacingExtra.s25,
      height: spacingExtra.s25,
      borderRadius: radius.lg,
      borderWidth: borderWidth.heavy,
      borderColor: theme.colors.verifyCheck,
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.xs,
    },
    statusCompleted: {
      //   backgroundColor: "#E8F9E8",
    },
  });

  return (
    <Pressable onPress={() => router.push(path)} style={styles.container}>
      {/* Step Number */}
      <View style={styles.stepBox}>
        <Text style={styles.stepText}>{stepNumber}</Text>
      </View>

      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Status Circle */}
      <View style={[styles.statusCircle, completed && styles.statusCompleted]}>
        {completed && <Ionicons name="checkmark" size={18} color="green" />}
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={20} color="#5c3c92" />
    </Pressable>
  );
};

export default StepCard;
