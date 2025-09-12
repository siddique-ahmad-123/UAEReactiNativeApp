import { fontSize } from "@/constants/Metrics";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";

interface WelcomeBannerProps {
  name: string;
  photoUrl: string;
}

const CustomProfileBanner: React.FC<WelcomeBannerProps> = ({ name, photoUrl }) => {
    const theme = useTheme();
  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.avatar} />
      <View>
        <Text style={[styles.welcomeText,{}]}>Welcome,</Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: fontSize.md,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B0082", // purple like in your screenshot
  },
});

export default CustomProfileBanner;
