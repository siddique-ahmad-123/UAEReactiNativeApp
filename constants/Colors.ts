/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { verticalScale, scale } from "@/utils/styling";




const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

 
export const colors = {
  primary: "#a3e635",
  primaryLight: "#0ea5e9",
  primaryDark: "#0369a1",
  text: "#3F1956",
  textLight: "#e5e5e5",
  textLighter: "#d4d4d4",
  white: "#FFFF",
  black: "#000",
  rose: "#ef4444",
  green: "#16a34a",
  inputTextcolor:"#B8B8B8",
  neutral50: "#fafafa",
  neutral100: "#f5f5f5",
  neutral200: "#e5e5e5",
  neutral300: "#d4d4d4",
  neutral350: "#CCCCCC",
  neutral400: "#a3a3a3",
  neutral500: "#737373",
  neutral600: "#525252",
  neutral700: "#404040",
  neutral800: "#262626",
  neutral900: "#171717",
};
 

 
export const theme = {
 
  colors: {
    primary: "#1E40AF", // blue-800
    secondary: "#64748B", // slate-500
    background: "#F9FAFB", // gray-50
    text: "#3F1956", // gray-900
    white: "#FFFFFF",
    error: "#DC2626", // red-600
    success: "#16A34A", // green-600
    warning: "#F59E0B",
    inputTextcolor:"#B8B8B8" // amber-500
  },
 
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: verticalScale(1) },
      shadowOpacity: 0.15,
      shadowRadius: scale(2),
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: verticalScale(3) },
      shadowOpacity: 0.2,
      shadowRadius: scale(4),
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: verticalScale(6) },
      shadowOpacity: 0.25,
      shadowRadius: scale(8),
      elevation: 8,
    },
  },
};

