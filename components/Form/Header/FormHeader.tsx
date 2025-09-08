// src/components/FormHeader.tsx
import { fontSize, fontWeight, radius, spacing, spacingVertical } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons"; // Expo has Ionicons built in
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { BarStepIndicator } from "./BarStepIndicator";

interface FormHeaderProps {
  stepNumber: number;
  title: string;
  subTitle: string;
  noOfBars: number;
  activeBarIndex: number;
  onBack: () => void;
  onClose: () => void;
  onInfoPress?: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  stepNumber,
  title,
  subTitle,
  noOfBars,
  activeBarIndex,
  onBack,
  onClose,
  onInfoPress,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      paddingHorizontal: spacing.xs,
      paddingVertical: spacingVertical.sm,
    },
    iconButton: {
      paddingHorizontal: spacing.xs,
      alignSelf: "center",
    },
    titleContainer: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      flex: 1,
      marginLeft: spacing.xs,
    },
    stepBadge: {
      backgroundColor: theme.colors.secondaryColor,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacingVertical.xs,
      marginRight: spacing.xs,
    },
    stepText: {
      color: theme.colors.textPrimary,
      fontWeight: fontWeight.bold,
    },
    title: {
      color: theme.colors.statusBarText,
      fontWeight: fontWeight.bold,
      fontSize: fontSize.md, 
      marginRight: spacing.sm, 
    },
  });
  return (
    <View>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Ionicons
            name="chevron-back"
            size={24}
            style={{ color: theme.colors.statusBarText }}
          />
        </TouchableOpacity>

        {/* Step badge + Title */}
        <View style={styles.titleContainer}>
          <View
            style={
              styles.stepBadge}
          >
            <Text style={styles.stepText}>{stepNumber}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onInfoPress} style={styles.iconButton}>
            <Ionicons
              name="information-circle-outline"
              size={15}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Close button */}
        <TouchableOpacity onPress={onClose} style={styles.iconButton}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          {subTitle}
        </Text>
        <View style={{ marginTop: 8 }}>
          <BarStepIndicator
            sections={noOfBars}
            activeSectionIndex={activeBarIndex}
          />
        </View>
      </View>
    </View>
  );
};
