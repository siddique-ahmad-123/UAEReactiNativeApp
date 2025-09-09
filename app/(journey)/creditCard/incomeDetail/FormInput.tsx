import React from "react";
import { Controller } from "react-hook-form";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface FormInputProps {
  control: any;
  name: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
}

export default function FormInput({ control, name, placeholder, keyboardType = "default" }: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ? String(value) : ""}
            keyboardType={keyboardType}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
});
