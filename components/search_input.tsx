import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "@/constants";

const SearchInput: React.FC<{
  title: string;
  value: string;
  onChange?: (e: string) => void;
  placerholder?: string;
}> = ({ title, value, onChange, placerholder }) => {
  const [setshowPassword, setSetshowPassword] = useState(false);
  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        placeholder={placerholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={"#7b7b8b"}
        secureTextEntry={title === "Password" && !setshowPassword}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          className=" w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
