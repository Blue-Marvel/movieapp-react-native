import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/search_input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty_state";
import HomeService from "@/services/home_service";
import HomeHostData from "@/models/home_model";
import useAppwrite from "@/lib/use_appwrite";
import VideoCard from "@/components/video_card";

const Home = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const homeService: HomeService = new HomeService();
  const { data: posts, refetch } = useAppwrite<HomeHostData>(
    homeService.getAllHost()
  );

  const { data: trendingPosts } = useAppwrite<HomeHostData>(
    homeService.getAllHost()
  );

  const onRefresh = async () => {
    setIsRefresh(true);
    await refetch();
    setIsRefresh(false);
  };

  // console.log(posts[0].$id);

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className=" justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className=" text-2xl font-psemibold text-white">
                  Marvel
                </Text>
              </View>
              <View className=" mt-1.5 ">
                <Image
                  source={images.logoSmall}
                  className=" w-9 h-10 "
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              title={""}
              value={""}
              placerholder="Search for a video topic"
            />
            <View className="w-full  flex-1 pt-5 pb-8">
              <Text className=" text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={trendingPosts ?? []} />
            </View>
          </View>
        )}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
