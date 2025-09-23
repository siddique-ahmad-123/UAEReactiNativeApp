import CustomMainChild from "@/components/CustomMainChild/CustomMainChild";
import { styles } from "@/components/styles/SelectCreditCard.Styles";
import { ImagesPath } from "@/constants/Image";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
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
    title: t("cashbackCreditCard"),
    description1: t("minimumIncomeRequirement"),
    description2:
      t("welcomeBonus"),
    description3:
      t("rewardsCashback"),
    description4: "",
    description5: "",
    description6: t("joiningFees"),
    description7: t("annualFees2"),
    image: ImagesPath.card1Image,
    joiningFees: t("nil"),
    anualFees: t("nil"),
  },
  {
    id: "2",
    title: t("eliteCreditCard"),
    description1: t("minimumIncomeRequirement"),
    description2:
      t("welcomeBonus"),
    description3:
      t("rewardpoint3"),
    description4:
      t("lifeStylePerks"),
    description5:
      t("bestRewards"),
    description6: t("joiningFees"),
    description7: t("annualFees2"),
    image: ImagesPath.card2Image,
    joiningFees: t("nil"),
    anualFees: "AED650",
  },
  {
    id: "3",
    title: t("worldCreditCard"),
    description1: t("minimumIncomeRequirement3"),
    description2:
      t("welcomeBonus3"),
    description3:
      t("rewardpoint3"),
    description4:
      t("perksAirport"),
    description5: t("Best Rewards: Deep perks, elite status travel benefits."),
    description6: t("joiningFees"),
    description7: t("annualFees2"),
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
            {t("knowMore")}
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
            {t("applyNow")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <CustomMainChild
      title={t("Select your credit card")}
      subTitle={t("weHaveCardsForEveryNeedExploreHere")}
      noOfButtons={1}
      singleButtonTitle={t("back")}
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
