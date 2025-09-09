import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
  width,
} from "@/constants/Metrics";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

interface SectionHeaderProps {
  sectionName: string;
  style?: object;
}

const SectionHeader = ({ sectionName, style }: SectionHeaderProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacingVertical.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius.sm,
      width: width.full,
      marginVertical: spacingVertical.sm,
    },
    text: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
    },
  });
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryLightColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color: theme.colors.primaryColor }]}>
        {sectionName}
      </Text>
    </View>
  );
};

export default SectionHeader;
