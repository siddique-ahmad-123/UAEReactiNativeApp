// components/MessageCard.tsx
import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "styled-components/native";

interface MessageCardProps {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, containerStyle, textStyle }) => {
    const theme = useTheme();
  return (
    <View style={[styles.card, containerStyle,{backgroundColor:theme.colors.primaryColor}]}>
      <Text style={[styles.message, textStyle,{color:theme.colors.background}]}>{message}</Text>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  card: {
 // purple
    borderRadius: 8,
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
