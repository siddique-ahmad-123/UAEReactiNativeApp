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
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { ImagesPath } from "@/constants/Image";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
type RouteNames = "/Request" | "/Agreement" | "/ExistingApplication";
const services: {
  id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  route: RouteNames;
}[] = [
  {
    id: "1",
    title: t("requests"),
    iconName: "document-text-outline",
    route: "/Request",
  },
  {
    id: "2",
    title: t("agreements"),
    iconName: "file-tray-outline",
    route: "/Agreement",
  },
  {
    id: "3",
    title: t("applications"),
    iconName: "clipboard-outline",
    route: "/ExistingApplication",
  },
];

const applyNow = [
  {
    id: "1",
    title: t("creditCards"),
    imgPath: ImagesPath.mainScreencardImages
  },
  {
    id: "2",
    title: t("mortgages"),
    imgPath: ImagesPath.mainScreenMortgageImages
  },
  {
    id: "3",
    title: t("autoLoans"),
    imgPath: ImagesPath.mainScreenAutoLoan
  },
  {
    id: "4",
    title: t("Personal \nLoans"),
    imgPath: ImagesPath.mainScreenPersonalLoan
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("1");
  const theme = useTheme();
  const { goToStep, stepIndex } = useApplicationStore();
const { t } = useTranslation();
  const { value: storedUser, loading } = useAsyncStorage<{
    emiratesId: string;
    mobile: string;
    userType: string;
    name?: string;
  }>("user");

  const localStyles = StyleSheet.create({
    container: {
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
          name={loading ? t("Loading..."): storedUser?.name ?? t("Guest")}
          imgPath={storedUser?.userType}
        />
      </View>
      <HeroBanner
        message={t("thankYouForBeing")}
        backgroundImage={ImagesPath.heroBannerImages}
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
      <Text style={localStyles.sectionTitle}>{t("applyNow")}</Text>
      <View style={localStyles.grid}>
        {applyNow.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            image={item.imgPath}
            onPress={() => {
              goToStep(stepIndex);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
