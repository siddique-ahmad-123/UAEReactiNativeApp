// toastConfig.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const toastConfig = {
  success: ({ text1, text2, icon }: any) => (
    <View style={[styles.toastContainer, styles.success]}>
      <Ionicons name={icon} size={20} color="#2e7d32" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2, icon }: any) => (
    <View style={[styles.toastContainer, styles.error]}>
      <Ionicons name={icon} size={20} color="#c62828" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  success: {
    backgroundColor: "#e8f5e9", // soft green
  },
  error: {
    backgroundColor: "#ffebee", // soft red
  },
  icon: {
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212121",
  },
  message: {
    fontSize: 13,
    color: "#616161",
    marginTop: 2,
  },
});
