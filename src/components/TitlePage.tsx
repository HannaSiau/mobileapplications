import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { type Href, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

const BUTTONS = [
  {
    label: "Start",
    url: '/menu',
    border: "border-pink-700",
    text: "text-pink-700",
    bg: "bg-indigo-950",
    size: "w-full py-8",
    tilt: "-rotate-2",
  },
    {
    label: "Login",
    url: '/menu',
    border: "border-sky-600",
    text: "text-sky-600",
    bg: "bg-indigo-950",
    size: "w-2/3 py-4",
    tilt: "rotate-3",
  }
] as const;

export default function TitlePage() {
    const router = useRouter();
    const onPressed = (url: Href) =>{
        router.push(url)
    };
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
            {BUTTONS.map(({ label, url, border, text, bg, tilt, size  }) => (
                <Pressable
                key={label}
                onPress={() => onPressed(url)}
                accessibilityRole="button"
                className={`${border} ${tilt} ${bg} ${size} items-center rounded-[36px] border-4 border-b-8 active:translate-y-1 active:border-b-4`}
                >
                <Text className={`${text} text-3xl font-extrabold`}>{label}</Text>
                </Pressable>
            ))}
            </View>
        </SafeAreaView>
    </View>
  );
}