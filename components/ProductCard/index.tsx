import React from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";
import Pentagon from "../Pentagon";

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
          <View style={styles.overlay} />
          <Text style={[styles.title, { color: theme.colors.statusBarText }]}>
            {title}
          </Text>
          <Pentagon size={100} color={theme.colors.primaryColor} cornerRadius={100} rotateAngle={45} bottom={-25} right={-10} />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
