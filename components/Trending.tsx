import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import icons from "@/constants/icons";
import { useEventListener } from "expo";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(item.video);

  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "idle") {
      setPlay(false);
    }
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === `trending-${item.$id}` ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          player={player}
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
            player.play();
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            imageStyle={{ borderRadius: 10 }}
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => `trending-${item.$id}`}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
          key={`trending-${item.$id}`}
        />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
    ></FlatList>
  );
};

export default Trending;
