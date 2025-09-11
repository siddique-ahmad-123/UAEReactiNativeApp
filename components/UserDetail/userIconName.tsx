import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const UserIconName = () => {
    const theme = useTheme();
  const localStyles = StyleSheet.create({
    header: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      paddingHorizontal: 16,
      color: "#3F1956",
    },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    welcome: { fontSize: 14 },
    username: { fontSize: 20, fontWeight: "400" },
  });
  return (
    <View style={localStyles.header}>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
        style={localStyles.avatar}
      />
      <View>
        <Text
          style={[
            localStyles.welcome,
            { color: theme.colors.inactiveNavIconColor },
          ]}
        >
          Welcome,
        </Text>
        <Text
          style={[localStyles.username, { color: theme.colors.primaryColor }]}
        >
          Mohammad Sahil Munaf
        </Text>
      </View>
    </View>
  );
};

export default UserIconName;
