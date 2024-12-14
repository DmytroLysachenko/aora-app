import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4 h-full">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
