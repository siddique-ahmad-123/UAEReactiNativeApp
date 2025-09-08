import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { styles } from "./utils";

interface HeroBannerProps {
  message: string;
  backgroundImage: any;
}

const HeroBanner = ({ message, backgroundImage }: HeroBannerProps) => {
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
