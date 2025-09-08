import {
  DarkThemeColorConstants,
  LightThemeColorConstants,
  ThemeColors,
} from "@/constants/Colors";
import { I18nManager } from "react-native";

export interface BaseTheme {
  isRTL: boolean;
  flexRow: { flexDirection: "row" | "row-reverse" };
  textAlign: "left" | "right";
}

export const baseTheme: BaseTheme = {
  isRTL: I18nManager.isRTL,
  flexRow: {flexDirection: I18nManager.isRTL ? "row-reverse" : "row"},
  textAlign: I18nManager.isRTL ? "right" : "left",
};

export interface AppTheme extends BaseTheme {
  colors: ThemeColors;
}

export const lightTheme: AppTheme = {
  ...baseTheme,
  colors: LightThemeColorConstants,
};

export const darkTheme: AppTheme = {
  ...baseTheme,
  colors: DarkThemeColorConstants,
};
