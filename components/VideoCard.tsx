import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEventListener } from "expo";
import { Models } from "react-native-appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { addVideoToFavorite, removeVideoFromFavorites } from "@/lib/appwrite";

interface VideoCardProps {
  video: Models.Document;
}

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
    likedBy,
    $id: videoId,
  },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  const { user } = useGlobalContext();

  const isFavorite = likedBy.includes(user!.$id);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const player = useVideoPlayer(video);

  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "idle") {
      setPlay(false);
    }
  });

  const handleAddToFavorites = async () => {
    try {
      const response = await addVideoToFavorite(user!.$id, videoId);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsMenuVisible(false);
    }
  };
  const handleRemoveFromFavorites = async () => {
    try {
      const response = await removeVideoFromFavorites(user!.$id, videoId);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsMenuVisible(false);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white text-sm font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsMenuVisible(!isMenuVisible);
          }}
          className="pt-2"
        >
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
        {isMenuVisible && (
          <View className="px-2 absolute right-0 top-10">
            <TouchableOpacity
              onPress={
                isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
              }
              className="flex-row p-2 rounded-lg items-center gap-2 bg-gray-600 z-10"
            >
              <Image
                className="w-6 h-6"
                source={icons.bookmark}
              />
              <Text className="text-white text-sm font-psemibold">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {play ? (
        <VideoView
          player={player}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
            player.play();
          }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
