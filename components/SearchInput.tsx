import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";

type SearchInputProps = {
  value: string;
  handleChangeText: (value: string) => void;
};

const SearchInput = ({ value, handleChangeText }: SearchInputProps) => {
  return (
    <View className=" flex-row border-2 border-red-100 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base items-center  "
        value={value}
        onChangeText={handleChangeText}
        placeholder="Search for a video topic"
        placeholderTextColor={"#7b7b8b"}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
