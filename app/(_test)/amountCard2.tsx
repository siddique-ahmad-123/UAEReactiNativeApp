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
import { scale } from "@/utils/styling";

interface DynamicSliderCardProps {
  title: string;
  value: number;
  setValue: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

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
      borderRadius: radius.lg,
      padding: spacing.md,
      marginVertical: spacingVertical.md,
      shadowColor: theme.colors.shadowColor,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    header: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom:spacingVertical.md
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      color: theme.colors.primaryColor,
    },
    inputRow: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: theme.colors.inactiveNavIconColor,
      borderRadius:radius.sm,
      paddingHorizontal:spacing.sm
    },
    input: {
      borderBottomWidth: 1,
      borderColor: "transparent",
      textAlign: "right",
      fontSize: fontSize.md,
      fontWeight:fontWeight.medium,
      color: theme.colors.primaryColor,
    },
    inputActive: {
      borderColor: theme.colors.primaryColor,
    },
    unit: { 
      fontSize: fontSize.md,
      marginRight: spacing.sm,
      color: theme.colors.inactiveNavIconColor },
    divider: { 
      fontSize: fontSize.xl,
      fontWeight:fontWeight.light,
      marginHorizontal: spacing.xs,
      marginBottom:spacingVertical.xs, 
      color: theme.colors.primaryColor,
    },
    
    tooltip: {
      backgroundColor: theme.colors.secondaryLight,
      paddingHorizontal: spacing.xs,
      borderRadius: radius.pill,
      right:"50%",
    },
    tooltipText: {
      fontWeight: fontWeight.medium,
      color: theme.colors.primaryColor,
      fontSize: fontSize.xs,
    },
    sliderThumb: {
      width: 22,
      height: 22,
      borderRadius: 11,
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
      fontSize: fontSize.md,
      fontWeight:fontWeight.light,
      color: theme.colors.primaryColor },
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
              size={20}
              color="#5E17EB"
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
        trackStyle={{ height: 12, borderRadius: 8 }}
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
