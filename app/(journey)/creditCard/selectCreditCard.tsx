import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { styles } from "@/components/styles/SelectCreditCard.Styles";
import { ImagesPath } from "@/constants/Image";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "styled-components/native";

const { width, height } = Dimensions.get("screen");

type CardItem = {
  id: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  description6: string;
  description7: string;
  image: any;
  joiningFees: string;
  anualFees: string;
};

const cards: CardItem[] = [
  {
    id: "1",
    title: "Cashback Credit Card",
    description1: "Minimum Income Requirement: AED 5,000/month.",
    description2:
      "Welcome Bonus: AED 500 for new customers (spend ≥AED 5,000 in first 2 months); AED 100 for existing cardholders.",
    description3:
      "Rewards / Cashback:\n• 5% on dining (local & international)\n• 2% on international spends\n• Up to 1% on local spends\n• 0.33% on govt. payments, utilities, education, \ncharity, fuel, rental, telecom spends",
    description4: "",
    description5: "",
    description6: "Joining Fees - Nil",
    description7: "Annual Fees - Nil",
    image: ImagesPath.card1Image,
    joiningFees: "Nil",
    anualFees: "Nil",
  },
  {
    id: "2",
    title: "Elite Credit Card",
    description1: "Minimum Income Requirement: AED 10,000/month.",
    description2:
      "Welcome Bonus: AED 1,200 cashback/spending bonuses (3 transactions ≥ AED 100 within 2 months)",
    description3:
      "Reward Points: 3 points per AED on international expenses; bonus on dining/duty-free; 1 point per AED on local",
    description4:
      "Lifestyle Perks: Global lounge access, airport transfers, Fitness First visits, cinema discounts, concierge benefits, etc.",
    description5:
      "Best Rewards: Extensive travel and lifestyle perks; ideal for frequent travelers.",
    description6: "Joining Fees - Nil",
    description7: "Annual Fees - AED650",
    image: ImagesPath.card2Image,
    joiningFees: "Nil",
    anualFees: "AED650",
  },
  {
    id: "3",
    title: "World Credit Card",
    description1: "Minimum Income Requirement: AED 25,000/month.",
    description2:
      "Welcome Bonus: AED 2,000 cashback after 3 transactions ≥ AED 100 in first 2 months",
    description3:
      "Reward Points: 3 points per AED on international expenses; bonus on dining/duty-free; 1 point per AED on local",
    description4:
      "Perks: Airport lounges (900+ worldwide, 12 visits/year), villa/pickup, valet, golf, fitness, concierge, cinema, fine dining, etc.",
    description5: "Best Rewards: Deep perks, elite status travel benefits.",
    description6: "Joining Fees - AED250",
    description7: "Annual Fees - AED650",
    image: ImagesPath.card3Image,
    joiningFees: "AED250",
    anualFees: "AED650",
  },
];

const RequestsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const _imageWidth = width * 0.8;
  const _spacing = 16; 
  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (_imageWidth + _spacing));
    setActiveIndex(index);
  };
  const { value: mobilenumber } = useAsyncStorage("user");
  const { nextStep, formData, updateField } = useApplicationStore();
  const { setValue } = useForm({
    defaultValues: formData,
  });
  const onClickApply = (
    value: string,
    joiningFees: string,
    anualFees: string
  ) => {
    console.log(mobilenumber?.mobile);
    setValue(fieldNames.cardType, value);
    updateField(fieldNames.cardType, value);
    setValue(fieldNames.cardJoiningFees, joiningFees);
    updateField(fieldNames.cardJoiningFees, joiningFees);
    setValue(fieldNames.cardAnualFees, anualFees);
    updateField(fieldNames.cardAnualFees, anualFees);
    setValue(fieldNames.mobileNo, mobilenumber?.mobile);
    updateField(fieldNames.mobileNo, mobilenumber?.mobile);
    setValue(fieldNames.userType, mobilenumber?.userType);
    updateField(fieldNames.userType, mobilenumber?.userType);
    console.log("Store formData:", formData);
    nextStep();
  };
  const renderItem = (item: CardItem) => (
    <View style={[styles.card, { backgroundColor: theme.colors.background,width:_imageWidth }]}>
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
        {item.description1}
      </Text>
      <Text
        style={[styles.cardDescription, { color: theme.colors.textPrimary }]}
      >
        {item.description2}
      </Text>
      <Text
        style={[styles.cardDescription, { color: theme.colors.textPrimary }]}
      >
        {item.description3}
      </Text>
      <Text
        style={[styles.cardDescription, { color: theme.colors.textPrimary }]}
      >
        {item.description4}
      </Text>
      <Text
        style={[styles.cardDescription, { color: theme.colors.textPrimary }]}
      >
        {item.description5}
      </Text>
      <Text
        style={[styles.cardDescription2, { color: theme.colors.textPrimary }]}
      >
        {item.description6}
      </Text>
      <Text
        style={[styles.cardDescription2, { color: theme.colors.textPrimary }]}
      >
        {item.description7}
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
          onPress={() =>
            onClickApply(item.title, item.joiningFees, item.anualFees)
          }
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
  
  return (
    <CustomMainChild
      title="Select your credit card"
      subTitle="We have cards for every need, explore here"
      noOfButtons={1}
      singleButtonTitle="Back"
      onClose={() => router.back()}
      onPressSingleButton={() => router.push("/NavScreen")}
    >
      <FlatList
        data={cards}
        renderItem={({ item }) => renderItem(item)}
        horizontal
        style={{ flexGrow: 0 }}
        pagingEnabled
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={"fast"}
        contentContainerStyle={{
          gap: _spacing,
          padding: 16,
        }}
        
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
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
