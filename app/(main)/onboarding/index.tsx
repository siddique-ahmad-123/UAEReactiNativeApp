import CustomButton from "@/components/CustomButton";
import Pentagon from "@/components/Pentagon";
import { spacingVertical } from "@/constants/Metrics";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  Text,
  View
} from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "../../../components/styles/onboarding.Styles";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { ImagesPath } from "@/constants/Image";



const { width, height } = Dimensions.get("window");

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
      "Get Credit Cards Approvals instantly and start accessing our innovative offerings.",
    imgpath: ImagesPath.landingPageImage1,
    
  },
  {
    id: "2",
    title: "Mortgages",
    description: "Get Mortgages In Principle Approval instantly and get access to your dream home.",
    imgpath: ImagesPath.landingPageImage2,
  },
  {
    id: "3",
    title: "Auto Loans",
    description: "Get Auto Loans In Principle Approval instantly and get access to your dream Car.",
    imgpath: ImagesPath.landingPageImage3
  },
  {
    id: "4",
    title: "Personal Loans",
    description: "Get Funds instantly in your account allowing you to access things you love.",
    imgpath: ImagesPath.landingPageImage4
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

  const {value:userData}=useAsyncStorage("user");

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

  const exitApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Image
        source={ImagesPath.newgenLogo}
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
          onPress={exitApp}
          variant="secondary"
          type="outlined"
          size="md"
        />
        <CustomButton
          title="Get Started"
          onPress={() => {
            console.log(userData);
            if (userData?.mobile) {
              router.push("/(auth)/otp");
            } else {
               router.push("/(auth)/login");
            }
           
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
