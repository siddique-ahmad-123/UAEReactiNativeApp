import React from "react";
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import Pentagon from "../Pentagon";
import { fontSize, fontWeight, radius, spacing, spacingVertical } from "@/constants/Metrics";

interface ProductCardProps {
  title: string;
  image: any;
  onPress?: () => void;
}

const ProductCard = ({ title, image, onPress }: ProductCardProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      width: spacing.xxxxxl,
      height: 180,
      borderRadius: radius.lg,
      overflow: "hidden",
    },
    image: {
      flex: 1,
      justifyContent: "flex-end",
    },
    imageStyle: {
      borderRadius: radius.lg,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject, // fill the parent
      backgroundColor: "#3b105328", // semi-transparent black
    },
    title: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      position: "absolute",
      bottom: spacing.md,
      right: spacing.sm,
      zIndex: 20,
    },
  });

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
          <Pentagon
            size={100}
            color={theme.colors.primaryColor}
            cornerRadius={100}
            rotateAngle={45}
            bottom={-25}
            right={-10}
            
          />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
