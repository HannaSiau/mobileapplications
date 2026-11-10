import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button } from "@/components/Button";

export default function TitlePage() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Image
        source={require("../../assets/images/titlescreen.jpg")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      <SafeAreaView className="flex-1 items-center justify-center gap-8 px-6">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 288, height: 192 }}
          contentFit="contain"
        />

        <View className="w-full max-w-sm items-center gap-6">
          <Button label="Start"    color="emerald"  size="lg" tilt="2"   onPress={() => router.push("/menu")} />
          <Button label="Login"    color="sky"   size="md" tilt="-2"  onPress={() => router.push("/login")} />
          <Button label="Register" color="amber" size="md" tilt="1" onPress={() => router.push("/register")} />
        </View>
      </SafeAreaView>
    </View>
  );
}