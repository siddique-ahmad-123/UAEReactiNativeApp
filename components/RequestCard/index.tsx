import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RequestCardProps = {
  title?: string;
  refNo: string;
  date: string;
  status: string;
  onPress?: () => void;
};

const RequestCard: React.FC<RequestCardProps> = ({
  title = "Call Back Request -",
  refNo,
  date,
  status,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>Ref No - {refNo}</Text>
        <Text style={styles.detail}>Date - {date}</Text>
        <Text style={styles.detail}>Status - {status}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Check Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3B006A",
    borderRadius: 10,
    padding: 16,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  detail: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 2,
  },
  button: {
    backgroundColor: "#FECB26",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2C004D",
  },
});

export default RequestCard;
