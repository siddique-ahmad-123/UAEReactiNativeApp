import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";

interface ProductCardProps {
  title: string;
  image: any;
}

const ProductCard = ({ title, image }: ProductCardProps) => {
  const theme = useTheme();
  return (
    <View style={styles.card}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        {/* Polygon Overlay */}
        <Text style={[styles.title, { color: theme.colors.statusBarText }]}>
          {title}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default ProductCard;
