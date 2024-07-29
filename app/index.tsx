import CustomButton from "@/components/custom-button";
import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { View, Image, ScrollView, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global_provider";

/**
 *
 * @function App onboarding screen
 * @returns React.JSX.element
 */
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  if (isLoading)
    return (
      <View className=" justify-center items-center bg-primary flex-1">
        <ActivityIndicator color="#000ff" />
      </View>
    );

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className=" text-3xl text-white font-bold text-center">
              Discover Endless {"\n"}Possibilities With{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
              resizeMode="contain"
            />
          </View>
          <Text className="tex-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: empark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            onPress={() => {
              router.push("/sign-in");
            }}
            title="Continue with Email"
            containerStyle=" w-full mt-7"
          />
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}
