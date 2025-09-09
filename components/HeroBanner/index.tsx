import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";

interface HeroBannerProps {
  message: string;
  backgroundImage: any;
}

const HeroBanner = ({ message, backgroundImage }: HeroBannerProps) => {
  const theme = useTheme();
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.bannerContainer}
      imageStyle={styles.bannerImage}
    >
      <View
        style={[
          styles.overlayBox,
          { backgroundColor: theme.colors.primaryColor },
        ]}
      >
        <Text
          style={[styles.messageText, { color: theme.colors.statusBarText }]}
        >
          {message}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default HeroBanner;
