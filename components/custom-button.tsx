import {TouchableOpacity, Text } from 'react-native'
import React from 'react';

interface CustomButtonProps {
  title: string,
  onPress: () => void,
  loading?: boolean,
  containerStyle?: string,
  textStyle?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, loading, containerStyle, textStyle}) => {
  return (
    <TouchableOpacity 
    className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${loading ? 'opacity-50' : ''}`}
    onPress={onPress}
    disabled={loading}
    activeOpacity={0.7}
    >
      <Text className={` text-primary font-psemibold text-lg ${textStyle}`} >{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton