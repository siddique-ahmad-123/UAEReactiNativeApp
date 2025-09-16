import { fontSize, fontWeight } from "@/constants/Metrics";
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
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
    },
    greetingSmall: {
      fontSize: fontSize.sm,
      fontWeight:fontWeight.normal
    },
    greetingName: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.normal,
    },
  });
  return (
    <View style={styles.greetingRow}>
      <Image
        source={imgPath=="ETB"?require("../../assets/images/avatar.png"):require("../../assets/images/user.png")} // replace with your avatar
        style={styles.avatar}
        resizeMode="cover"
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
