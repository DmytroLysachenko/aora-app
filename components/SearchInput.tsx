import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className=" flex-row border-2 border-red-100 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base items-center  "
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder="Search for a video topic"
        placeholderTextColor={"#CDCDE0"}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Error", "Please fill in the field");
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
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
