import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";
import MethodSelector from "@/components/MethodSelector";
import { styles } from "../styles/submitApplication3.Styles";

const NotificationScreen = () => {
  const theme = useTheme();

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
        {/* Approved Icon & Title */}
        <View style={styles.image}>
          <Image
            source={require("../../../assets/images/animatedImg.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
          </View>
          <Text style={[styles.textbox2, { color: theme.colors.textPrimary }]}>
            Sorry, Application Not Approved
          </Text>
          <Text
            style={[
              styles.textbox3,
              { color: theme.colors.secondaryText, marginBottom: 30 },
            ]}
          >
           We’re sorry but your request did not go through with the amount of  45,000 AED.
  </Text>

<View style={styles.linkTextView}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[styles.linktext, { color: theme.colors.primaryColor }]}
            >
              You can choose for counter offer or apply for higher limit with our team
            </Text>
          </TouchableOpacity>
        </View>
     

        <MethodSelector
            title="Counter Offer"
            options={methodOptions}
            selectedId={selectedMethod}
            onSelect={(id) => setSelectedMethod(id)}
            titleCenter
          />


        {/* Back Button */}
          <View style={[styles.row,{marginTop:50}]}>
          <CustomButton
            title="Need higher amount"
            onPress={() => {}}
            variant="secondary"
            type="outlined"
            size="lg"
          />
          <CustomButton
            title="Accept Offer"
            onPress={() => {}}

            variant="primary"
            type="filled"
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
