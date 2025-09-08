import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { colors } from "@/constants/Colors";
import { styles } from "../styles/onboarding.Styles";

const { width, height } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Credit Cards",
    description:
      "Get Credit Cards Approvals instantly and start accessing our innovative offerings",
  },
  {
    id: "2",
    title: "Loans",
    description: "Quick approvals for personal and business loans.",
  },
  {
    id: "3",
    title: "Investments",
    description: "Grow your wealth with our smart investment tools.",
  },
  {
    id: "4",
    title: "Insurance",
    description: "Protect your future with tailored insurance plans.",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width, alignItems: "center" }}>
      <Image
        source={require("../../../assets/images/newgenLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ImageBackground
        source={require("../../../assets/images/onborBack.png")}
        style={{ width: "100%", height: height * 0.4 }}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
                backgroundColor: currentIndex === index ? "#5B2E91" : "#E5D4F4",
                width: currentIndex === index ? 39 : 10,
              },
            ]}
          />
        ))}
      </View>
      <View style={[styles.row, { marginTop: 130, marginBottom:30 }]}>
        <CustomButton
          title="Cancel"
          onPress={() => {}}
          variant="secondary"
          type="outlined"
          size="md"
        />
        <CustomButton
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          onPress={() => {
            if (currentIndex === slides.length - 1) {
              router.push("/(auth)/login");
            } else {
              flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
              });
            }
          }}
          variant="primary"
          type="filled"
          size="md"
        />
      </View>
    </SafeAreaView>
  );
};

export default Carousel;
