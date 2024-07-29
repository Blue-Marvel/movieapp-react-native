import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HomeHostData from "@/models/home_model";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard: React.FC<{ video: HomeHostData }> = ({ video }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start pb-2">
        <View className=" justify-center items-center flex-row flex-1">
          <View className=" w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center ">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className=" justify-center flex-1 ml-3 px-3 gap-1">
            <Text
              className=" text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular  "
              numberOfLines={1}
            >
              {video.creator.username}
            </Text>
          </View>
        </View>
        <View className="pt-2 ">
          <Image
            source={icons.menu}
            className=" w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          className="w-full h-60 rounded-xl mt-3 bg-white/10"
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
          onPress={() => {
            setPlay(true);
          }}
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl relative justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className=" absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
