export const LightThemeColorConstants = {
  primaryColor: "#3F1956",
  secondaryColor: "#FECB26",

  primaryLightColor: "#E6D9F5",
  secondaryLight: "#FFEDB1",

  statusbar: "#51266C",
  statusBarText: "#ffffffff",

  background: "#ffffffff",
  iconBackground: "#7E5A9B",

  textPrimary: "#333333",
  inputFieldBorder: "#DEDEDE",

  verifyCheck: "#2F9400",
  verifyCheckLight: "#EAFFE0",

  inactiveNavIconColor: "#9498A9",

  placeholderColor: "#DEDEDE",

  shadowColor: "#000",

  trackerBgColor: "#EFE8F3",

  textHeader: "#FFFF",

  borderColor:"#DDDD",

  errorTextColor: "#FF3333",

  secondaryText:"#636363",

  subtitle:"#666"
} as const;

export const DarkThemeColorConstants = {
  primaryColor: "#3F1956",
  secondaryColor: "#FECB26",

  primaryLightColor: "#E6D9F5",
  secondaryLight: "#FFEDB1",

  statusbar: "#51266C",
  statusBarText: "#ffffffff",

  background: "#ffffffff",
  iconBackground: "#7E5A9B",

  textPrimary:"#333333",
  inputFieldBorder:"#DEDEDE",

  verifyCheck: "#2F9400",
  verifyCheckLight: "#EAFFE0",

  inactiveNavIconColor: "#9498A9",

  placeholderColor: "#DEDEDE",

  shadowColor: "#000",

  trackerBgColor: "#EFE8F3",

  textHeader: "#FFFF",

  borderColor:"#CCCC",

  errorTextColor: "#FF3333",
    secondaryText:"#636363",
      subtitle:"#666"
} as const;
export type ThemeColors = typeof LightThemeColorConstants;
