import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { images } from "@/constants";
import FormField from "@/components/form_field";
import CustomButton from "@/components/custom-button";
import AuthService from "@/services/auth_service";
import { useGlobalContext } from "@/context/global_provider";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const authService = new AuthService();
  var login = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    try {
      await authService.signIn(form.email, form.password);
      const user = await authService.getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      //set to global state using context like state management

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary  h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-bold mt-10 font-psemiboldb">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            onChange={(e: string) => setform({ ...form, email: e })}
            style="mt-7"
            keyboardType="email-address"
            placerholder="Enter your email"
          />
          <FormField
            title="Password"
            value={form.password}
            onChange={(e: string) => setform({ ...form, password: e })}
            style="mt-7"
          />
          <CustomButton
            title="Sign In"
            onPress={login}
            containerStyle="mt-7"
            loading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
