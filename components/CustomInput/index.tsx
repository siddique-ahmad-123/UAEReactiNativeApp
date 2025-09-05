import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "currency" | "password";
  variant?: "full" | "half";
  mandatory?: boolean;
  secureTextEntry?: boolean;
}

const CustomInput = ({
  label,
  placeholder,
  type = "text",
  variant = "full",
  mandatory = false,
}: CustomInputProps) => {
  const [value, setValue] = useState("");
  const [secure, setSecure] = useState(false);

  const getVariantStyle = () => {
    switch (variant) {
      case "half":
        return styles.half;
      case "full":
      default:
        return styles.full;
    }
  };

  return (
    <View style={[styles.container, getVariantStyle()]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {mandatory && <Text style={{ color: "red" }}> *</Text>}
        </Text>
        <View style={styles.labelLine} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, type === "password" && { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={setValue}
          secureTextEntry={secure}
          keyboardType={
            type === "email"
              ? "email-address"
              : type === "number" || type === "currency"
              ? "numeric"
              : "default"
          }
        />

        {type === "password" && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye" : "eye-off"}
              size={20}
              color="#555"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 12,
    backgroundColor: "#fff",
  },
  full: {
    width: "100%",
  },
  half: {
    width: "50%",
  },
  labelContainer: {
    position: "absolute",
    top: -10,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3F1956",
  },
  labelLine: {
    // flex: 1,
    height: 1.5,
    backgroundColor: "#ccc",
    marginLeft: 6,
  },
  input: {
    fontSize: 16,
    paddingTop: 12,
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    paddingHorizontal: 6,
  },
});
