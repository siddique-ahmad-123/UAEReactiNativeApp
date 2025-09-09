import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./utils";

interface LabeledSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  defaultValue?: number;
}

const LabeledSlider = ({
  label,
  min,
  max,
  step = 1,
  unit = "",
  defaultValue,
}: LabeledSliderProps) => {
  const [value, setValue] = useState(defaultValue || min);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={String(value)}
            keyboardType="numeric"
            onChangeText={(text) => {
              const num = parseInt(text) || min;
              setValue(Math.min(Math.max(num, min), max));
            }}
          />
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#6A0DAD"
          maximumTrackTintColor="#E6E0EC"
          thumbTintColor="#FBBF24"
        />
      </View>

      <View style={styles.rangeRow}>
        <Text style={styles.rangeText}>
          {min} {unit}
        </Text>
        <Text style={styles.rangeText}>
          {max} {unit}
        </Text>
      </View>
    </View>
  );
};

export default LabeledSlider;
