import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { styles } from "../styles/onboarding.Styles";
import { useTheme } from "styled-components/native";
import Pentagon from "@/components/Pentagon";
import { spacingVertical } from "@/constants/Metrics";

const { width, height } = Dimensions.get("window");

import { ImageSourcePropType } from "react-native";

type Slide = {
  id: string;
  title: string;
  description: string;
  imgpath: ImageSourcePropType;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Credit Cards",
    description:
      "Get Credit Cards Approvals instantly and start accessing our innovative offerings",
    imgpath: require("../../../assets/images/StaringCarosoul/CreditCard.png"),
  },
  {
    id: "2",
    title: "Mortgages",
    description: "Quick approvals for personal and business loans.",
    imgpath: require("../../../assets/images/StaringCarosoul/Mortgages.png"),
  },
  {
    id: "3",
    title: "Auto Loans",
    description: "Grow your wealth with our smart investment tools.",
    imgpath: require("../../../assets/images/StaringCarosoul/AutoLoans.png"),
  },
  {
    id: "4",
    title: "Personal Loans",
    description: "Protect your future with tailored insurance plans.",
    imgpath: require("../../../assets/images/StaringCarosoul/PersonalLoans.png"),
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const theme = useTheme();

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width, alignItems: "center" }}>
      <ImageBackground
        source={item.imgpath}
        style={{ width: "100%", height: height * 0.3 }}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0; 
      }
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Image
        source={require("../../../assets/images/newgenLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Pentagon
        color={theme.colors.primaryLightColor}
        cornerRadius={100}
        rotateAngle={45}
        top={spacingVertical.xxxl}
        left={-25}
      />
      <Pentagon
        color={theme.colors.primaryLightColor}
        cornerRadius={100}
        rotateAngle={45}
        bottom={230}
        right={-30}
      />
      <Pentagon
        size={50}
        color="#9d87aaff"
        cornerRadius={100}
        rotateAngle={4}
        bottom={150}
        right={-5}
      />
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  currentIndex === index
                    ? theme.colors.primaryColor
                    : theme.colors.primaryLightColor,
                width: currentIndex === index ? 39 : 10,
              },
            ]}
          />
        ))}
      </View>
      <View style={[styles.row, { marginTop: 130, marginBottom: 30 }]}>
        <CustomButton
          title="Cancel"
          onPress={() => {}}
          variant="secondary"
          type="outlined"
          size="md"
        />
        <CustomButton
          title="Get Started"
          onPress={() => {
            // if (currentIndex === slides.length - 1) {
            //   router.push("/(auth)/login");
            // } else {
            //   flatListRef.current?.scrollToIndex({
            //     index: currentIndex + 1,
            //     animated: true,
            //   });
            // }
            router.push("/(auth)/login");
          }}
          variant="primary"
          type="filled"
          size="md"
        />
      </View>
    </View>
  );
};

export default Carousel;
