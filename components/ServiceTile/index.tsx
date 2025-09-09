import {
  fontSize,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

interface ServiceTileProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const ServiceTile = ({ title, iconName }: ServiceTileProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.primaryColor }]}
    >
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: theme.colors.iconBackground },
        ]}
      >
        <Ionicons name={iconName} size={spacing.lg} color="#fff" />
      </View>
      <Text style={[styles.title, { color: theme.colors.statusBarText }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceTile;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#3F1956",
    borderRadius: radius.lg,
    paddingVertical: spacingVertical.md,
    paddingHorizontal: spacing.md,
    alignItems: "flex-start", // left aligned as per your screenshot
    justifyContent: "space-between",
    // width: spacingX._120 ?? 120,
    width: spacing.xl,
  },
  iconWrapper: {
    // backgroundColor: "#7E5A9B",
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacingVertical.md,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    // color: "white",
    textAlign: "left",
  },
});
