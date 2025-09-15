import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";

interface ServiceTileProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: (event: GestureResponderEvent) => void;
}

const ServiceTile = ({ title, iconName, onPress }: ServiceTileProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.primaryColor }]}
      onPress={onPress}
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
    borderRadius: radius.lg,
    padding: spacing.sm,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: spacing.xxxxl,
  },
  iconWrapper: {
    // backgroundColor: "#7E5A9B",
    padding: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacingVertical.md,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    // color: "white",
    textAlign: "left",
  },
});
