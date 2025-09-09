import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";
import { localStyles } from "@/app/(main)/styles/Home.Styles";

const navItems = [
  { id: "1", title: "Home", icon: require("../../assets/icons/home.png") },
  { id: "2", title: "Calculator", icon: require("../../assets/icons/mobile.png") },
  { id: "3", title: "Need Help", icon: require("../../assets/icons/headphn.png") },
  { id: "4", title: "Notifications", icon: require("../../assets/icons/notification.png") },
  { id: "5", title: "Menu", icon: require("../../assets/icons/menu.png") },
];

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  
  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
      <View style={localStyles.bottomNav}>
        {navItems.map((item) => {
          const isActive = activeTab === item.title;
          return (
            <TouchableOpacity
              key={item.id}
              style={localStyles.navItem}
              onPress={() => setActiveTab(item.title)}
            >
              <Image
                source={item.icon}
                style={[
                  localStyles.navIcon,
                  { tintColor: isActive ? colors.primary : colors.gray },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  localStyles.navText,
                  { color: isActive ? colors.primary : colors.gray },
                ]}
              >
                {item.title}
              </Text>
              {isActive && <View style={localStyles.activeUnderline} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomNav;
