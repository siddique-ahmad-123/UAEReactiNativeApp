import { localStyles } from "@/app/(main)/styles/Home.Styles";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

const navItems = [
  { id: "1", title: "Home", icon: require("../../assets/icons/home.png") },
  {
    id: "2",
    title: "Calculator",
    icon: require("../../assets/icons/mobile.png"),
  },
  {
    id: "3",
    title: "Need Help",
    icon: require("../../assets/icons/headphn.png"),
  },
  {
    id: "4",
    title: "Notifications",
    icon: require("../../assets/icons/notification.png"),
  },
  { id: "5", title: "Menu", icon: require("../../assets/icons/menu.png") },
];

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: theme.colors.background }}
    >
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
                  {
                    tintColor: isActive
                      ? theme.colors.primaryColor
                      : theme.colors.inactiveNavIconColor,
                  },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  localStyles.navText,
                  {
                    color: isActive
                      ? theme.colors.primaryColor
                      : theme.colors.inactiveNavIconColor,
                  },
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
