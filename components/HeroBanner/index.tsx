import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { StyleSheet } from "react-native";
import {
  fontSize,
  fontWeight,
  radius,
  spacing,
} from "@/constants/Metrics";

interface HeroBannerProps {
  message: string;
  backgroundImage: any;
}

const HeroBanner = ({ message, backgroundImage }: HeroBannerProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    bannerContainer: {
      borderRadius: radius.lg,
      overflow: "hidden",
    },
    bannerImage: {
      borderRadius: radius.lg,
      resizeMode:"cover"
    },
    overlayBox: {
      backgroundColor: theme.colors.primaryColor,
      padding: spacing.md,
      borderRadius: radius.lg,
      margin: spacing.md,
      maxWidth: "50%",
    },
    messageText: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
      color: theme.colors.statusBarText,
    },
  });

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.bannerContainer}
      imageStyle={styles.bannerImage}
    >
      <View style={styles.overlayBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </ImageBackground>
  );
};

export default HeroBanner;
