import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "@/constants";

const FormField: React.FC<{
  title: string;
  value: string;
  onChange: (e: string) => void;
  style?: string;
  keyboardType?: string;
  placerholder?: string;
}> = ({ title, value, onChange, style, keyboardType, placerholder }) => {
  const [setshowPassword, setSetshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${style}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          placeholder={placerholder}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={title === "Password" && !setshowPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setSetshowPassword(!setshowPassword)}
          >
            <Image
              source={!setshowPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
