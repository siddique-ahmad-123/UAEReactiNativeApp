import { scale, verticalScale } from "@/utils/styling";

export const spacing = {
  none: 0,
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(40),
  xxxl: scale(60),
  xxxxl: scale(104),
  xxxxxl: scale(160),
} as const;

// 🔹 Vertical spacing (use for height,paddingY,marginY) in y direction
export const spacingVertical = {
  xs: verticalScale(4),
  sm: verticalScale(8),
  semi: verticalScale(12),
  md: verticalScale(16),
  lg: verticalScale(24),
  xl: verticalScale(32),
  xxl: verticalScale(40),
  xxxl: verticalScale(60),
  xxxxl: verticalScale(160),
} as const;

// 🔹 Border radius (use for borderRadius)
export const radius = {
  none: 0,
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(16),
  xxl: scale(20),
  pill: scale(30),
  round: scale(9999),
} as const;

export const fontSize = {
  xxs: scale(10),
  xs: scale(12),
  sm: scale(14),
  md: scale(16),
  lg: scale(18),
  xl: scale(22),
  xxl: scale(28),
  xxxl: scale(34),
} as const;

// 🔹 Font weights
export const fontWeight = {
  thin: "100",
  extraLight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
} as const;

export const spacingExtra = {
  s3: scale(3),
  s5: scale(5),
  s7: scale(7),
  s10: scale(10),
  s12: scale(12),
  s15: scale(15),
  s20: scale(20),
  s25: scale(25),
  s30: scale(30),
  s35: scale(35),
  s40: scale(40),
  s60: scale(60),
  s100: scale(100),
  s120: scale(120),
  s160: scale(160),
} as const;

export const borderWidth = {
  none: 0,
  hairline: 0.5,
  thin: 1,
  normal: 1.5,
  thick: 2,
  heavy: 3,
  extra: 4,
} as const;

export const width = {
  none: "0%",
  xs: "10%",
  sm: "20%",
  md: "45%",
  lg: "60%",
  xl: "80%",
  full: "100%",
} as const;

// ---------- 🧑‍💻 TypeScript Types for Autocomplete ----------

export type SpacingKey = keyof typeof spacing;
export type SpacingExtraKey = keyof typeof spacingExtra;
export type SpacingVerticalKey = keyof typeof spacingVertical;
export type RadiusKey = keyof typeof radius;
export type FontSizeKey = keyof typeof fontSize;
export type FontWeightKey = keyof typeof fontWeight;
export type BorderWidthKey = keyof typeof borderWidth;
export type WidthKey = keyof typeof width;
