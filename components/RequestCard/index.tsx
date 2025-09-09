import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";

type RequestCardProps = {
  title?: string;
  refNo: string;
  date: string;
  status: string;
  onPress?: () => void;
};

const RequestCard: React.FC<RequestCardProps> = ({
  title = "Call Back Request -",
  refNo,
  date,
  status,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.primaryColor }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.colors.statusBarText }]}>
          {title}
        </Text>
        <Text style={[styles.detail, { color: theme.colors.statusBarText }]}>
          Ref No - {refNo}
        </Text>
        <Text style={[styles.detail, { color: theme.colors.statusBarText }]}>
          Date - {date}
        </Text>
        <Text style={[styles.detail, { color: theme.colors.statusBarText }]}>
          Status - {status}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.colors.secondaryColor },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: theme.colors.primaryColor }]}>
          Check Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#3B006A",
    borderRadius: radius.md,
    padding: spacing.md,
    margin: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    // color: "#fff",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    marginBottom: spacingVertical.xs,
  },
  detail: {
    // color: "#fff",
    fontSize: fontSize.xs,
    marginBottom: spacingVertical.sm,
  },
  button: {
    // backgroundColor: "#FECB26",
    paddingVertical: spacingVertical.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  buttonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    // color: "#2C004D",
  },
});

export default RequestCard;
