import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { isLoading } from 'expo-font';

type CustomButtonProps = {
  title: string;
  containerStyle?: string;
  handlePress: () => void;
  textStyle?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  containerStyle,
  textStyle,
  handlePress,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
