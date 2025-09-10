import CustomButton from "@/components/CustomButton";
import globalStyles from "@/components/CustomButton/utils";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { styles } from "../styles/SelectCreditCard.Styles";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

type CardItem = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const cards: CardItem[] = [
  {
    id: "1",
    title: "Cashback Credit Card",
    description:
      "Minimum Income Requirement: AED 5000/month.\nEarn cashback on every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/month.n every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/monthn every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/monthn every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/month",
    image: require("../../../assets/images/card1.png"),
  },
  {
    id: "2",
    title: "Elite Credit Card",
    description:
      "Minimum Income Requirement: AED 5000/month.\nEarn cashback on every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/month.n every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/monthn every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/monthn every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/month",
    image: require("../../../assets/images/card2.png"),
  },
  {
    id: "3",
    title: "World Credit Card",
    description:
      "Minimum Income Requirement: AED 5000/month.\nEarn cashback on every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/month.n every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/monthn every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/monthn every spend.\nFree movie tickets monthly.\nComplimentary airport lounge access.\nAnnual Fee: AED 300.Minimum Income Requirement: AED 15,000/month",
    image: require("../../../assets/images/card3.png"),
  },
];

const RequestsScreen = () => {
  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = (item: CardItem) => (
    <View style={[styles.card,{backgroundColor:theme.colors.background}]}>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={[styles.cardTitle,{color:theme.colors.primaryColor}]}>{item.title}</Text>
      <Text style={[styles.cardDescription,{color:theme.colors.textPrimary}]}>{item.description}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.knowMoreBtn,{borderColor:theme.colors.primaryColor}]}>
          <Text style={[styles.knowMoreText,{color:theme.colors.textPrimary}]}>Know More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.applyBtn,{backgroundColor:theme.colors.secondaryColor}]}  onPress={() => router.push("/SelectRequiredAmount")}>
          <Text style={[styles.applyText,{color:theme.colors.primaryColor}]}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor:theme.colors.primaryColor}]}>
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle,{color:theme.colors.background}]}>Select your Card</Text>
        </View>
        <Text style={[styles.subHeader,{color:theme.colors.background}]}>
          We have cards for every need, explore here
        </Text>
      </View>

      {/* White Container with Rounded Top */}
      <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
        {/* Carousel of cards */}
        <Carousel
  ref={carouselRef}
  width={width - 70}   // make card narrower than screen
  height={568}
  data={cards}
  renderItem={({ item }) => renderItem(item)}
  mode="parallax"
  loop={false}
  onProgressChange={(_, absoluteProgress) => {
    setActiveIndex(Math.round(absoluteProgress));
  }}
  modeConfig={{
    parallaxScrollingScale: 0.9,   // scale down side cards
    parallaxScrollingOffset: 40,   // creates the gap between cards
  }}
/>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {cards.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.dot,{backgroundColor:theme.colors.borderColor},
                activeIndex === index && styles.activeDot,{backgroundColor:theme.colors.primaryColor}
              ]}
            />
          ))}
        </View>

        {/* Footer Button */}
      <CustomButton
  title="Back"
  size="full"
  variant="primary"
  type="filled"
  onPress={() => router.push("/NavScreen")}
  style={{ marginTop: 30 }}
/>
      </View>
    </SafeAreaView>
  );
};
export default RequestsScreen;
