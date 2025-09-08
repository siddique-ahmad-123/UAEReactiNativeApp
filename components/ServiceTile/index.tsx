import { colors } from "@/constants/Colors";
import { fontSize, radius, spacingX, spacingY } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceTileProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const ServiceTile = ({ title, iconName }: ServiceTileProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={spacingX._25} color="#fff" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ServiceTile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F1956",
    borderRadius: radius.lg,
    paddingVertical: spacingY._20,
    paddingHorizontal: spacingX._15,
    alignItems: "flex-start", // left aligned as per your screenshot
    justifyContent: "space-between",
    // width: spacingX._120 ?? 120,
    width: 120,
  },
  iconWrapper: {
    backgroundColor: "#7E5A9B",
    padding: spacingX._10,
    borderRadius: radius.md,
    marginBottom: spacingY._10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.white,
    textAlign: "left",
  },
});
