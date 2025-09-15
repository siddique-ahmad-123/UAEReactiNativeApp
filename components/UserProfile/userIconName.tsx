import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

type Props = {
  imgPath?: string;
  name: string;
};
const UserIconName = ({ imgPath, name }: Props) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    greetingRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
    },
    greetingSmall: {
      fontSize: 13,
    },
    greetingName: {
      fontSize: 18,
      fontWeight: "500",
      marginTop: 2,
    },
  });
  return (
    <View style={styles.greetingRow}>
      <Image
        source={require("../../assets/images/avatar.png")} // replace with your avatar
        style={styles.avatar}
      />
      <View style={{ marginLeft: 12 }}>
        <Text
          style={[
            styles.greetingSmall,
            { color: theme.colors.primaryColor },
          ]}
        >
          Welcome,
        </Text>
        <Text
          style={[styles.greetingName, { color: theme.colors.shadowColor }]}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export default UserIconName;
