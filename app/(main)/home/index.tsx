import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import ServiceTile from "@/components/ServiceTile";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { useTheme } from "styled-components/native";
import { useApplicationStore } from "@/store/applicationStore";
import { Ionicons } from "@expo/vector-icons";
import UserIconName from "@/components/UserProfile/userIconName";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";

import {
  spacing,
  spacingVertical,
} from "@/constants/Metrics";

type RouteNames = "/Request" | "/Agreement" | "/ExistingApplication";
const services: {
  id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  route: RouteNames;
}[] = [
  {
    id: "1",
    title: "Requests",
    iconName: "document-text-outline",
    route: "/Request",
  },
  {
    id: "2",
    title: "Agreements",
    iconName: "file-tray-outline",
    route: "/Agreement",
  },
  {
    id: "3",
    title: "Applications",
    iconName: "clipboard-outline",
    route: "/ExistingApplication",
  },
];

const applyNow = [
  {
    id: "1",
    title: "Credit Card",
    imgPath: require("../../../assets/images/MainScreenCard/Card.png"),
  },
  {
    id: "2",
    title: "Mortgages",
    imgPath: require("../../../assets/images/MainScreenCard/Mortgage.png"),
  },
  {
    id: "3",
    title: "Auto Loans",
    imgPath: require("../../../assets/images/MainScreenCard/AutoLoan.png"),
  },
  {
    id: "4",
    title: "Personal \nLoans",
    imgPath: require("../../../assets/images/MainScreenCard/PersonalLoan.png"),
  },
];

export default function Dashboard() {
  const router = useRouter();
  const theme = useTheme();
  const { goToStep, stepIndex } = useApplicationStore();
  const { value: storedUser, loading } = useAsyncStorage<{
    emiratesId: string;
    mobile: string;
    userType: string;
    name?: string;
  }>("user");

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - spacing.md * 2 - spacing.md) / 2; // 2 per row

  const localStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: spacing.md,
      justifyContent: "space-between",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.primaryColor,
      marginBottom: spacing.sm,
    },
    serviceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacingVertical.md,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: spacingVertical.sm,
    },
    topSection: {
      gap: spacingVertical.md,
    },
    card: {
      width: cardWidth,
    },
  });

  return (
    <View style={localStyles.container}>
      {/* 🔹 Top Section */}
      <View style={localStyles.topSection}>
        <UserIconName
          name={loading ? "Loading..." : storedUser?.name ?? "Guest"}
          imgPath={storedUser?.userType}
        />

        <HeroBanner
          message="Thank you for being associated with us."
          backgroundImage={require("../../../assets/images/HeroBanner.png")}
        />

        <Text style={localStyles.sectionTitle}>My Services</Text>
        <View style={localStyles.serviceRow}>
          {services.map((item) => (
            <ServiceTile
              key={item.id}
              title={item.title}
              iconName={item.iconName}
              onPress={() => router.push(item.route)}
            />
          ))}
        </View>
      </View>

      {/* 🔹 Bottom Section */}
      <View>
        <Text style={localStyles.sectionTitle}>Apply Now</Text>
        <View style={localStyles.grid}>
          {applyNow.map((item) => (
            <View key={item.id} style={localStyles.card}>
              <ProductCard
                title={item.title}
                image={item.imgPath}
                onPress={() => {
                  goToStep(stepIndex);
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
