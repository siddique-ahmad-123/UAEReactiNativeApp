import { scale, verticalScale } from "@/utils/styling";

//example
// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: scale(16),   // horizontal spacing
//     paddingVertical: verticalScale(12),  // vertical spacing
//   },
//   title: {
//     fontSize: scale(18),           // font size based on width
//     marginBottom: verticalScale(8), // spacing below
//   },
//   avatar: {
//     width: scale(48),
//     height: scale(48),             // keep same scale to remain square
//     borderRadius: scale(24),
//   },
// });

export const spacing = {
  none: 0,
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(40),
  xxxl: scale(60),
} as const;

// 🔹 Vertical spacing (use for height,paddingY,marginY) in y direction
export const spacingVertical = {
  xs: verticalScale(4),
  sm: verticalScale(8),
  md: verticalScale(16),
  lg: verticalScale(24),
  xl: verticalScale(32),
  xxl: verticalScale(40),
  xxxl: verticalScale(60),
} as const;

// 🔹 Border radius (use for borderRadius)
export const radius = {
  none: 0,
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(20),
  pill: scale(30),
  round: scale(9999), 
} as const;


export const fontSize = {
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
// ---------- 🧑‍💻 TypeScript Types for Autocomplete ----------

export type SpacingKey = keyof typeof spacing;
export type SpacingExtraKey = keyof typeof spacingExtra;
export type SpacingVerticalKey = keyof typeof spacingVertical;
export type RadiusKey = keyof typeof radius;
export type FontSizeKey = keyof typeof fontSize;
export type FontWeightKey = keyof typeof fontWeight;
