import React from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};
const ScreenWrapper = ({style,children}:ScreenWrapperProps) => {
    return (
        <SafeAreaView style={[ styles.container, style]}>
            <StatusBar  barStyle="dark-content"/>         
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
