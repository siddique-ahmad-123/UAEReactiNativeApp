import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
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
  borderWidth,
  fontSize,
  fontWeight,
  radius,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
type RouteNames = "/Request" | "/Agreement" | "/ExistingApplication";
const { width } = Dimensions.get("window");
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
  const [activeTab, setActiveTab] = useState("1");
  const theme = useTheme();
  const { goToStep, stepIndex } = useApplicationStore();

  const { value: storedUser, loading } = useAsyncStorage<{
    emiratesId: string;
    mobile: string;
    userType: string;
    name?: string;
  }>("user");

  const localStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: spacing.md,
      gap: spacingVertical.md,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.primaryColor,
      justifyContent: "flex-start",
    },
    serviceRow: {
      flexDirection: theme.flexRow.flexDirection,
      justifyContent: "space-between",
    },
    grid: {
      flexDirection: theme.flexRow.flexDirection,
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: spacingVertical.md,
    },
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={localStyles.container}
    >
      <View>
        <UserIconName
          name={loading ? "Loading..." : storedUser?.name ?? "Guest"}
          imgPath={storedUser?.userType}
        />
      </View>
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
      <Text style={localStyles.sectionTitle}>Apply Now</Text>
      <View style={localStyles.grid}>
        {applyNow.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            image={item.imgPath}
            onPress={() => {
              goToStep(stepIndex);
              // router.push("/(journey)/creditCard/selectCreditCard");
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
