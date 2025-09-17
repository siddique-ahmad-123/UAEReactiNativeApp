import {Dimensions, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12;
// screens/CarouselBackgroundAnimation/data.js
export const metaData = [
  { item: 'https://picsum.photos/id/237/200/300' },
  { item: 'https://picsum.photos/seed/picsum/200/300' },
];

const CarouselWithLeftRightPartialVisible = () => {
  return (
    <View style={styles.container}>
        <Text>HLO</Text>
      <FlatList
        data={metaData}
        renderItem={({item, index}) => <Photo item={item} index={index} />}
        horizontal
        style={{flexGrow: 0}}
        pagingEnabled
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={'fast'}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CarouselWithLeftRightPartialVisible;

type PhotoProps = {
  item: { item: string };
  index: number;
};

const Photo = ({item, index}: PhotoProps) => {
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: 'hidden',
        borderRadius: 16,
      }}>
      <Image source={{uri: item.item}} style={{flex: 1, resizeMode: 'cover'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
