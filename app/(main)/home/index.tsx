import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { localStyles } from "../styles/Home.Styles";
import { styles } from "../styles/onboarding.Styles";
import ServiceTile from "@/components/ServiceTile";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { useTheme } from "styled-components/native";

type RouteNames = "/Request" | "/Agreement" | "/ExistingApplication";
const services: { id: string; title: string; iconName: string; route: RouteNames }[] = [
  { id: "1", title: "Requests", iconName: "document-text-outline", route: "/Request" },
  { id: "2", title: "Agreements", iconName: "file-tray-outline", route: "/Agreement" },
  { id: "3", title: "Applications", iconName: "clipboard-outline", route: "/ExistingApplication" },
];


const applyNow = [
  { id: "1", title: "Credit Card" },
  { id: "2", title: "Mortgages" },
  { id: "3", title: "Auto Loans" },
  { id: "4", title: "Personal Loans" },
];

const navItems = [
  {
    id: "1",
    title: "Home",
    icon: require("../../../assets/icons/home.png"),
    screen: "Dashboard",
  },
  {
    id: "2",
    title: "Calculator",
    icon: require("../../../assets/icons/mobile.png"),
    screen: "Calculator",
  },
  {
    id: "3",
    title: "Need Help",
    icon: require("../../../assets/icons/headphn.png"),
    screen: "Help",
  },
  {
    id: "4",
    title: "Notifications",
    icon: require("../../../assets/icons/notification.png"),
    screen: "Notifications",
  },
  {
    id: "5",
    title: "Menu",
    icon: require("../../../assets/icons/menu.png"),
    screen: "Menu",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("1");
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={localStyles.header}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={localStyles.avatar}
          />
          <View>
            <Text
              style={[
                localStyles.welcome,
                { color: theme.colors.inactiveNavIconColor },
              ]}
            >
              Welcome,
            </Text>
            <Text
              style={[
                localStyles.username,
                { color: theme.colors.primaryColor },
              ]}
            >
              Mohammad Sahil Munaf
            </Text>
          </View>
        </View>

        <HeroBanner
          message="Thank you for being associated with us."
          backgroundImage={require("../../../assets/images/HeroBanner.png")}
        />

        {/* My Services */}
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

        {/* Apply Now */}
        <Text style={localStyles.sectionTitle}>Apply Now</Text>
        <View style={localStyles.grid}>
          {applyNow.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              image={require("../../../assets/images/ProductImage.png")}
              onPress={() => router.push("/selectcreditcard")}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
    </SafeAreaView>
  );
}
