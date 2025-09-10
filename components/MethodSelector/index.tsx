import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Example icon lib, optional
import { useTheme } from "styled-components/native";
import { fontSize, fontWeight, radius, spacing, spacingVertical } from "@/constants/Metrics";

interface MethodOption {
  id: string;
  title: string;
  description: string;
  iconName?: string; // Ionicons name, optional
  amount?: string; // for future use
}

interface MethodSelectorProps {
  title?: string;
  options: MethodOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({
  title = "Select Method",
  options,
  selectedId,
  onSelect,
}) => {
  
  const handleSelect = (id: string) => {
    onSelect(id);
  }
  const theme = useTheme();
  const styles = StyleSheet.create({
    title: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semiBold,
      marginBottom: spacingVertical.sm,
      color: theme.colors.primaryColor,
    },
    optionContainer: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
      gap: spacing.md,
    },
    card: {
      flex: 1,
      borderRadius: radius.lg,
      padding: spacing.md,
      justifyContent: "center",
      elevation: 2, 
      shadowColor: theme.colors.shadowColor, 
      shadowOpacity: 0.1,
      shadowRadius: radius.sm,
    },
    cardDefault: {
      backgroundColor: theme.colors.primaryLightColor,
    },
    cardSelected: {
      backgroundColor: theme.colors.primaryColor,
    },
    cardTitle: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.bold,
      marginBottom: spacingVertical.xs,
    },
    cardDescription: {
      fontSize: fontSize.xxs,
    },
    cardAmount:{
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      marginBottom: spacingVertical.xs,
    }
  });
  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.optionContainer}>
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.card,
                isSelected ? styles.cardSelected : styles.cardDefault,
              ]}
              onPress={() => handleSelect(option.id)}
              activeOpacity={0.8}
            >
              {option.iconName && (
                <Ionicons
                  name={option.iconName as any}
                  size={28}
                  color={isSelected ? theme.colors.background : theme.colors.primaryColor}
                  style={{ marginBottom: 8 }}
                />
              )}
              <Text
                style={[
                  styles.cardTitle,
                  { color: isSelected ?theme.colors.background : theme.colors.primaryColor},
                ]}
              >
                {option.title}
              </Text>
              <Text
                style={[
                  styles.cardDescription,
                  { color: isSelected ? theme.colors.background : theme.colors.primaryColor },
                ]}
              >
                {option.description}
              </Text>
              {option.amount && (
                <Text
                  style={[
                    styles.cardAmount,
                    { color: isSelected ? theme.colors.background : theme.colors.primaryColor },
                  ]}
                >
                  {option.amount}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MethodSelector;
