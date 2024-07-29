import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";

const EmptyState: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[250px]"
        resizeMode="contain"
      />
      <Text className=" text-xl font-psemibold text-center text-white ">
        {title}
      </Text>
      <Text className=" font-pmedium text-sm text-gray-100 ">{subtitle}</Text>

      <CustomButton
        title="Create video"
        onPress={() => router.push("/create")}
        containerStyle=" w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
