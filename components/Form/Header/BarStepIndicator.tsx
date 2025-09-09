// src/components/TwoBarStepIndicator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface BarStepIndicatorProps {
  sections: number;           // total sections
  activeSectionIndex: number; // 0-based index
}

export const BarStepIndicator: React.FC<BarStepIndicatorProps> = ({
  sections,
  activeSectionIndex,
}) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: sections }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            index <= activeSectionIndex ? styles.activeBar : styles.inactiveBar,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeBar: {
    backgroundColor: '#fff', // active = white
  },
  inactiveBar: {
    backgroundColor: '#888', // inactive = gray
  },
});
