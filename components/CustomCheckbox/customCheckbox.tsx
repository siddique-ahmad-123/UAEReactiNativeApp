import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

type Props = {
  control?: any;
  name?: string;
  value?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  checkboxPosition?: "left" | "right";
  defaultChecked?: boolean;
  checkboxName?: string; // title above checkbox
};

const CustomCheckbox: React.FC<Props> = ({
  control,
  name,
  value,
  label,
  onChange,
  style,
  checkboxPosition = "left",
  defaultChecked = false,
  checkboxName,
}) => {
  const [localChecked, setLocalChecked] = useState(defaultChecked);

  const renderCheckbox = (
    checked: boolean,
    setChecked: (val: boolean) => void
  ) => (
    <View style={[styles.container, style]}>
      {checkboxName && <Text style={styles.checkboxName}>{checkboxName}</Text>}

      <TouchableOpacity
        style={[
          styles.option,
          checkboxPosition === "right" && styles.optionRight,
        ]}
        onPress={() => {
          const newChecked = !checked;
          setChecked(newChecked);
          if (onChange) onChange(newChecked);
        }}
      >
        {checkboxPosition === "left" ? (
          <>
            <View style={[styles.box, checked && styles.boxSelected]}>
              {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.box, checked && styles.boxSelected]}>
              {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { value: fieldVal, onChange: formOnChange } }) =>
          renderCheckbox(!!fieldVal, (val) => formOnChange(val))
        }
      />
    );
  }

  return renderCheckbox(localChecked, setLocalChecked);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },
  checkboxName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionRight: {
    justifyContent: "space-between",
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#000000ff",
    justifyContent: "center",
    alignItems: "center",
  },
  boxSelected: {
    backgroundColor: "#ffffffff",
    borderColor: "#0056b3",
  },
  checkmark: {
    color: "#0056b3",
    fontSize: 12,
    fontWeight: "bold",
    
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
});

export default CustomCheckbox;