import React from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const ScreenWrapper = ({style,children}:ScreenWrapperProps) => {
  const theme = useTheme();
    return (
        <SafeAreaView style={[ styles.container, style]}>
            <StatusBar  backgroundColor={theme.colors.statusbar}/>
            {children}
        </SafeAreaView>
    );
}

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
