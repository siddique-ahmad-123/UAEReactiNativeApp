import { styles } from "@/app/(main)/styles/SelectCreditCard.Styles";
import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "styled-components/native";

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
  const { nextStep } = useApplicationStore();
  const renderItem = (item: CardItem) => (
    <View style={[styles.card, { backgroundColor: theme.colors.background }]}>
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text style={[styles.cardTitle, { color: theme.colors.primaryColor }]}>
        {item.title}
      </Text>
      <Text
        style={[styles.cardDescription, { color: theme.colors.textPrimary }]}
      >
        {item.description}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.knowMoreBtn,
            { borderColor: theme.colors.primaryColor },
          ]}
        >
          <Text
            style={[styles.knowMoreText, { color: theme.colors.textPrimary }]}
          >
            Know More
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.applyBtn,
            { backgroundColor: theme.colors.secondaryColor },
          ]}
          onPress={() => nextStep()}
        >
          <Text
            style={[styles.applyText, { color: theme.colors.primaryColor }]}
          >
            Apply Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const theme = useTheme();
  return (
    <CustomMainChild
      title="Select your credit card"
      subTitle="We have cards for every need, explore here"
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.back()}
      onPressSingleButton={() => router.push("/NavScreen")}
    >
      <Carousel
        ref={carouselRef}
        width={width - 70}
        height={568}
        data={cards}
        renderItem={({ item }) => renderItem(item)}
        mode="parallax"
        loop={false}
        onProgressChange={(_, absoluteProgress) => {
          setActiveIndex(Math.round(absoluteProgress));
        }}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 40,
        }}
      />
      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: theme.colors.borderColor },
              activeIndex === index && styles.activeDot,
              { backgroundColor: theme.colors.primaryColor },
            ]}
          />
        ))}
      </View>
    </CustomMainChild>
  );
};
export default RequestsScreen;
