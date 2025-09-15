import React, { useState, useRef, useMemo } from "react";
import { StyleSheet, Text, View, PanResponder, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";

// --- Helper Functions ---
// Formats numbers with commas (e.g., 20000 -> "20,000")
const formatNumber = (num: any) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// --- Main Component ---
export default function App() {
  const MIN_AMOUNT = 10000;
  const MAX_AMOUNT = 200000;

  const [amount, setAmount] = useState(20000);

  // Refs to store layout information
  const sliderWidth = useRef(0);
  const sliderRef = useRef(null);

  // --- PanResponder for the custom slider ---
  // This handles the touch and drag functionality for the slider thumb
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) => {
          // When touch starts, update amount based on touch position
          updateAmount(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (evt, gestureState) => {
          // When dragging, continuously update amount
          updateAmount(evt.nativeEvent.locationX);
        },
      }),
    [sliderWidth.current]
  );

  // --- Logic for updating the slider's value ---
  const updateAmount = (xPosition: any) => {
    if (sliderWidth.current === 0) return;

    // Clamp the position within the slider's bounds
    let clampedX = Math.max(0, Math.min(xPosition, sliderWidth.current));

    // Calculate the value based on the position
    const percentage = clampedX / sliderWidth.current;
    let newAmount = Math.round(
      MIN_AMOUNT + percentage * (MAX_AMOUNT - MIN_AMOUNT)
    );

    // Clamp the value within the min/max bounds
    newAmount = Math.max(MIN_AMOUNT, Math.min(newAmount, MAX_AMOUNT));

    setAmount(newAmount);
  };

  // Calculate positions and widths based on the current amount
  const percentage = (amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT);
  const progressWidth = useMemo(() => {
    if (sliderWidth.current === 0) return 0;
    return percentage * sliderWidth.current;
  }, [percentage, sliderWidth.current]);
  const thumbLeft = sliderWidth.current * percentage;
  const tooltipLeft = sliderWidth.current * percentage;

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {/* --- Top Section: Title and Editable Amount --- */}
        <View style={styles.topRow}>
          <Text style={styles.title}>Card Amount</Text>
          <View style={styles.amountInput}>
            <Text style={styles.amountText}>{formatNumber(amount)}</Text>
            <View style={styles.separator} />
            <Text style={styles.currencyText}>AED</Text>
            <Svg
              height="16"
              width="16"
              viewBox="0 0 24 24"
              style={styles.editIcon}
            >
              <Path
                fill="#333"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              />
            </Svg>
          </View>
        </View>

        {/* --- Slider Section --- */}
        <View style={styles.sliderContainer}>
          {/* Tooltip that shows the current value above the thumb */}
          <View
            style={[
              styles.tooltipContainer,
              sliderWidth.current
                ? {
                    left: tooltipLeft,
                    transform: [{ translateX: -25 * percentage - 15 }],
                  }
                : {},
            ]}
          >
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{formatNumber(amount)} AED</Text>
            </View>
          </View>

          {/* The interactive slider itself */}
          <View
            ref={sliderRef}
            style={styles.sliderTrack}
            {...panResponder.panHandlers}
            onLayout={(event) => {
              // Get the actual width of the slider track on screen
              sliderWidth.current = event.nativeEvent.layout.width;
            }}
          >
            <View style={[styles.sliderProgress, { width: progressWidth }]} />
            <View
              style={[
                styles.sliderThumb,
                { left: thumbLeft, transform: [{ translateX: -12 }] },
              ]}
            />
          </View>
        </View>

        {/* --- Bottom Labels --- */}
        <View style={styles.labelsRow}>
          <Text style={styles.labelText}>{formatNumber(MIN_AMOUNT)} AED</Text>
          <Text style={styles.labelText}>{formatNumber(MAX_AMOUNT)} AED</Text>
        </View>
      </View>
    </View>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#F3F0F9",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B0082",
  },
  amountInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  separator: {
    width: 1,
    height: "60%",
    backgroundColor: "#D0D0D0",
    marginHorizontal: 8,
  },
  currencyText: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  editIcon: {
    marginLeft: 8,
  },
  sliderContainer: {
    position: "relative",
    height: 50,
    justifyContent: "center",
    marginBottom: 5,
  },
  sliderTrack: {
    height: 16,
    backgroundColor: "#D6C4E7",
    borderRadius: 4,
    width: "100%",
  },
  sliderProgress: {
    height: 16,
    backgroundColor: "#6A0DAD",
    borderRadius: 4,
    position: "absolute",
  },
  sliderThumb: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: "#f8e68dff",
    borderWidth: 3,
    borderColor: "#F9D423",
    top: -8, // Center the thumb on the track
  },
  tooltipContainer: {
    position: "absolute",
    top: -16,
    alignItems: "center",
  },
  tooltip: {
    backgroundColor: "#FDF0B5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tooltipText: {
    color: "#A67C00",
    fontWeight: "600",
    fontSize: 12,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  labelText: {
    fontSize: 14,
    color: "#666",
  },
});
