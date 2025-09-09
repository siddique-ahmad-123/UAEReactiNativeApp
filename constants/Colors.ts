
export const LightThemeColorConstants = {
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

  verifyCheck:"#2F9400",
  verifyCheckLight:"#EAFFE0"
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

  verifyCheck:"#2F9400",
  verifyCheckLight:"#EAFFE0"
}as const;
export type ThemeColors = typeof LightThemeColorConstants;
