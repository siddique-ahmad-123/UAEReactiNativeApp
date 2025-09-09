import React from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";

interface ProductCardProps {
  title: string;
  image: any;
  onPress?: () => void; 
}

const ProductCard = ({ title, image, onPress }: ProductCardProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <Text style={[styles.title, { color: theme.colors.statusBarText }]}>
            {title}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
