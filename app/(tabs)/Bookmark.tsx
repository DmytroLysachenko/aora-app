import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { getUserFavoritePosts } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

const Bookmark = () => {
  const { data: posts, refetch } = useAppwrite(() =>
    getUserFavoritePosts(user!.$id)
  );

  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            refetch={refetch}
            key={item.$id}
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back,
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos added to your bookmarks yet"
            type="bookmark"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
