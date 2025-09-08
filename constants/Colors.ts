const getLavenderRgba = (alpha: number) => `rgba(63, 25, 86, ${alpha})`;
const getBorderLightColor = (num: number) => `rgba(0, 0, 0, ${num})`;
const fadedOrange = (num: number) => `rgba(255, 243, 231,${num})`;
const iconBackgroundColor = (num: number) => `rgba(72, 31, 94,${num})`;
const greenOpacity = (num: number) => `rgba(221, 255, 218, ${num})`;
const redOpacity = (num: number) => `rgba(255, 217, 222, ${num});`;

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
