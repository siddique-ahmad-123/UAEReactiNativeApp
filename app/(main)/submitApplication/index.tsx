import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView, // 👈 added
} from "react-native";

import CustomButton from "@/components/CustomButton";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";
import { styles } from "../styles/submitApplication.Styles";
import MethodSelector from "@/components/MethodSelector";
import DocumentDownload from "@/components/DocumentDownload";

const NotificationScreen = () => {
  const [selectedMethod, setSelectedMethod] = React.useState<
    string | undefined
  >();

  const methodOptions = [
    {
      id: "email",
      title: "Credit Limit",
      description: "",
      iconName: "mail-outline",
      amount: "250 AED",
    },
    {
      id: "sms",
      title: "Joining Fees",
      description: "Will be deducted from 1st credit card installment",
      iconName: "chatbubble-outline",
      amount: "45000 AED",
    },
    {
      id: "app",
      title: "Annual Fees",
      description: "Stay updated in the app",
      iconName: "notifications-outline",
      amount: "650 AED",
    },
  ];

  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.primaryColor }]}
    >
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text
            style={[styles.headerTitle, { color: theme.colors.textHeader }]}
          >
            Submit Application
          </Text>
          <TouchableOpacity>
            <Text
              style={[styles.closeButton, { color: theme.colors.background }]}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* White Container with Rounded Top */}
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Approved Icon & Title */}
          <View style={styles.image}>
            <Image
              source={require("../../../assets/images/approved-icon.png")}
              style={styles.successImage}
              resizeMode="contain"
            />
            <Text
              style={[styles.textbox2, { color: theme.colors.textPrimary }]}
            >
              Application Approved
            </Text>
            <Text
              style={[styles.textbox, { color: theme.colors.secondaryText,marginBottom: 30 },]}
            >
              Your application is approved successfully
            </Text>
          </View>

          {/* Method Selector */}
          <MethodSelector
            title="Credit Card Details"
            options={methodOptions}
            selectedId={selectedMethod}
            onSelect={(id) => setSelectedMethod(id)}
          />

          {/* Card Image */}
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Image
              source={require("../../../assets/images/card3.png")}
              style={styles.imageSpex}
              resizeMode="contain"
            />
          </View>

          {/* Download Text */}
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text style={[styles.text,{color:theme.colors.borderColor}]}>
              You can download your offer letter from below
            </Text>
          </View>

          {/* Download Button */}
          <DocumentDownload documentName="Download Offer Letter" />

          {/* Back Button */}
          <CustomButton
            title="Accept Offer"
            size="full"
            variant="primary"
            type="filled"
            onPress={() => {}}
            style={{ marginTop: 20 }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
