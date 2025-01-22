import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  type: "bookmark" | "home";
}

const EmptyState = ({ title, subtitle, type }: EmptyStateProps) => {
  const isHomePage = type === "home";

  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title={isHomePage ? "Create video" : "Add video"}
        handlePress={() => router.push(isHomePage ? "/create" : "/home")}
        containerStyle="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
