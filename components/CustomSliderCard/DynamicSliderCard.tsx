// components/DynamicSliderCard.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { useTheme } from "styled-components/native";
import {
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";

interface DynamicSliderCardProps {
  title: string;
  value: number;
  setValue: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

// 🔹 New compact constants
const SLIDER_CONSTANTS = {
  cardPadding: spacing.sm,
  headerMargin: spacingVertical.sm,
  inputFont: fontSize.sm,
  titleFont: fontSize.md,
  thumbSize: 18,
  trackHeight: 8,
};

const DynamicSliderCard: React.FC<DynamicSliderCardProps> = ({
  title,
  value,
  setValue,
  min,
  max,
  step = 1,
  unit = "",
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.primaryLightColor,
      borderRadius: radius.md,
      padding: SLIDER_CONSTANTS.cardPadding,
      shadowColor: theme.colors.shadowColor,
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 1,
    },
    header: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SLIDER_CONSTANTS.headerMargin,
    },
    title: {
      fontSize: SLIDER_CONSTANTS.titleFont,
      fontWeight: fontWeight.medium,
      color: theme.colors.primaryColor,
    },
    inputRow: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: theme.colors.inactiveNavIconColor,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.xs,
    },
    input: {
      textAlign: "right",
      fontSize: SLIDER_CONSTANTS.inputFont,
      fontWeight: fontWeight.medium,
      color: theme.colors.primaryColor,
      paddingVertical: 2,
      minWidth: 50,
    },
    inputActive: {
      borderColor: theme.colors.primaryColor,
    },
    unit: {
      fontSize: SLIDER_CONSTANTS.inputFont,
      marginRight: spacing.xs,
      color: theme.colors.inactiveNavIconColor,
    },
    divider: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.light,
      marginHorizontal: spacing.xs,
      color: theme.colors.primaryColor,
    },
    tooltip: {
      backgroundColor: theme.colors.secondaryLight,
      paddingHorizontal: spacing.xs,
      borderRadius: radius.pill,
    },
    tooltipText: {
      fontWeight: fontWeight.medium,
      color: theme.colors.primaryColor,
      fontSize: fontSize.xs,
    },
    sliderThumb: {
      width: SLIDER_CONSTANTS.thumbSize,
      height: SLIDER_CONSTANTS.thumbSize,
      borderRadius: SLIDER_CONSTANTS.thumbSize / 2,
      borderWidth: 2,
      backgroundColor: theme.colors.secondaryLight,
      borderColor: theme.colors.secondaryColor,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: spacingVertical.xs,
    },
    rangeText: {
      fontSize: SLIDER_CONSTANTS.inputFont,
      fontWeight: fontWeight.light,
      color: theme.colors.primaryColor,
    },
  });

  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(value));

  const handleEditToggle = () => {
    if (editing) {
      const numericVal = Number(tempValue);
      if (!isNaN(numericVal)) {
        const clamped = Math.min(Math.max(numericVal, min), max);
        setValue(clamped);
      }
    } else {
      setTempValue(String(value));
    }
    setEditing(!editing);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, editing && styles.inputActive]}
            editable={editing}
            keyboardType="numeric"
            value={editing ? tempValue : String(value)}
            onChangeText={setTempValue}
          />
          {unit ? <Text style={styles.divider}>|</Text> : null}
          {unit ? <Text style={styles.unit}>{unit}</Text> : null}
          <TouchableOpacity onPress={handleEditToggle}>
            <MaterialIcons
              name={editing ? "check" : "edit"}
              size={18}
              color={theme.colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={(val) =>
          setValue(Array.isArray(val) ? Number(val[0].toFixed(2)) : val)
        }
        minimumTrackTintColor={theme.colors.sliderColor}
        maximumTrackTintColor="#D8BFD8"
        trackStyle={{ height: SLIDER_CONSTANTS.trackHeight, borderRadius: 6 }}
        thumbStyle={styles.sliderThumb}
        renderAboveThumbComponent={() => (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              {value.toLocaleString()} {unit}
            </Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.rangeText}>
          {min.toLocaleString()} {unit}
        </Text>
        <Text style={styles.rangeText}>
          {max.toLocaleString()} {unit}
        </Text>
      </View>
    </View>
  );
};

export default DynamicSliderCard;
