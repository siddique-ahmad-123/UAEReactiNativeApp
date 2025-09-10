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
          <Text style={[styles.title, { color: theme.colors.statusBarText }]}>
            {title}
          </Text>
          <Pentagon size={120} color={"#3f1956f5"} cornerRadius={100} rotateAngle={0} bottom={-25} left={-15} />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
