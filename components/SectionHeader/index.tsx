import { fontSize, radius, spacingX, spacingY } from "@/constants/Metrics";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SectionHeaderProps {
  sectionName: string;
}

const SectionHeader = ({ sectionName }: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{sectionName}</Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBDCF9",
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._12,
    borderRadius: radius.sm,
    marginVertical: spacingY._10,
    width: "100%",
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#3F1956",
  },
});
