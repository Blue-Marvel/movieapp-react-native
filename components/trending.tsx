import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { FC, useState } from "react";
import HomeHostData from "@/models/home_model";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
} as Animatable.CustomAnimation;
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
} as Animatable.CustomAnimation;

const TrendingItems: FC<{ items: HomeHostData; activeItem: string }> = ({
  items: items,
  activeItem: acitveItem,
}) => {
  const [play, setPlay] = useState(false);
  console.log(items.video);

  return (
    <Animatable.View
      className="mr-5"
      animation={acitveItem === items.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        // <Text className=" text-white">Playing</Text>
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={true}
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className=" relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: items.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden my-5 shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="h-12 w-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: FC<{ posts: HomeHostData[] }> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(`{posts[1].$id}`);

  const viewAbleItemChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<HomeHostData>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItems activeItem={activeItem} items={item} />
      )}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      onViewableItemsChanged={(viewAbleItem) =>
        viewAbleItemChanged(viewAbleItem)
      }
      horizontal={true}
    />
  );
};

export default Trending;
