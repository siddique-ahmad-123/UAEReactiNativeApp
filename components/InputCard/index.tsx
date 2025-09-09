// components/InputCard.tsx
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const InputCard: React.FC<Props> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  formatValue,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);

  const theme = useTheme();

  const onLayout = (e: LayoutChangeEvent) =>
    setTrackWidth(e.nativeEvent.layout.width);

  return (
    <View
      style={[
        styles.inputCard,
        { backgroundColor: theme.colors.background },
        { borderColor: theme.colors.inputFieldBorder },
        { shadowColor: theme.colors.shadowColor },
      ]}
    >
      <View style={styles.inputCardRow}>
        <Text style={styles.inputLabel}>{label}</Text>

        <View
          style={[
            styles.amountInputBox,
            { borderColor: theme.colors.inputFieldBorder },
          ]}
        >
          <TextInput
            value={formatValue ? formatValue(value) : String(value)}
            onChangeText={(val) => {
              const n = Number(String(val).replace(/,/g, "") || 0);
              onChange(clamp(Math.round(n), min, max));
            }}
            keyboardType="numeric"
            style={styles.amountInput}
          />
          {unit ? <Text style={styles.amountUnit}>{unit}</Text> : null}
        </View>
      </View>

      {/* custom slider */}
      <View onLayout={onLayout} style={styles.sliderWrapper}>
        <View
          style={[
            styles.trackBackground,
            { backgroundColor: theme.colors.trackerBgColor },
          ]}
        />
        <View
          style={[
            styles.trackActive,
            { backgroundColor: theme.colors.primaryColor },
            {
              width:
                trackWidth > 0
                  ? `${((value - min) / (max - min)) * 100}%`
                  : "0%",
            },
          ]}
        />
        <Slider
          style={StyleSheet.absoluteFill}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={(v) => onChange(Math.round(v))}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#FECB26"
        />
      </View>

      <View style={styles.rangeRow}>
        <Text style={[styles.rangeText, { color: theme.colors.textPrimary }]}>
          {formatValue ? formatValue(min) : min} {unit}
        </Text>
        <Text style={[styles.rangeText, { color: theme.colors.textPrimary }]}>
          {formatValue ? formatValue(max) : max} {unit}
        </Text>
      </View>
    </View>
  );
};

export default InputCard;

const styles = StyleSheet.create({
  inputCard: {
    // backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 11,
    marginBottom: 16,
    // shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  inputCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: { fontSize: 16, fontWeight: "600" },
  amountInputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    // borderColor: "#ddd",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  amountInput: {
    minWidth: 60,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  amountUnit: { marginLeft: 4, fontSize: 14 },
  sliderWrapper: { marginTop: 12 },
  trackBackground: {
    height: 6,
    // backgroundColor: "#eee",
    borderRadius: 3,
  },
  trackActive: {
    height: 6,
    // backgroundColor: "#6a0dad",
    borderRadius: 3,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rangeText: {
    fontSize: 12,
    // color: "#555",
  },
});
