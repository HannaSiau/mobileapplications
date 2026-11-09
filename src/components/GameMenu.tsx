'use client'
import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import { PlayerAmt } from "./Game";
import { useAuth } from '@/context/AuthContext';

const MODES = [
  {
    players: 3,
    label: "Trio",
    hex: "#F59E0B",
    border: "border-amber-500",
    text: "text-amber-500",
    tilt: "-rotate-1",
  },
  {
    players: 2,
    label: "Duo",
    hex: "#C2185B",
    border: "border-pink-700",
    text: "text-pink-700",
    tilt: "rotate-1",
  },
    {
    players: 1,
    label: "Solo",
    hex: "#0284C7",
    border: "border-sky-600",
    text: "text-sky-600",
    tilt: "-rotate-2",
  }
] as const;


export default function GameMenu() {
    const router = useRouter();
    const { user } = useAuth();
    const onPressed = (playerAmt: PlayerAmt) =>(
        router.push(`/game/${playerAmt}`)
    );
    console.log('user in menu:', user);
    return (
    <SafeAreaView className="flex-1 items-center justify-center bg-indigo-950 px-6">
        <Text className="mb-2 -rotate-2 text-5xl font-black text-white">Monster Mash!</Text>
        <Text className="mb-10 text-lg font-semibold text-indigo-300">
          {user?.name ? `Welcome, ${user.name}!` : "Hoeveel spelers?"}
        </Text>
        <View className="w-full max-w-sm items-center gap-6">
            {MODES.map(({ players, label, hex, border, text, tilt }) => (
                <Pressable
                key={players}
                onPress={() => onPressed(players)}
                accessibilityRole="button"
                accessibilityLabel={`${label}, ${players} ${players === 1 ? "player" : "players"}`}
                className={`${border} ${tilt} w-full items-center gap-2 rounded-[36px] border-4 border-b-8 bg-transparent py-8 active:translate-y-1 active:border-b-4`}
                >
                    <View className="flex-row gap-2">
                        {Array.from({ length: players }).map((_, i) => (
                            <Ionicons key={i} name="person" size={48} color={hex} />
                        ))}
                    </View>
                    <Text className={`${text} text-3xl font-extrabold`}>{label}</Text>
                    </Pressable>
                ))}
        </View>
    </SafeAreaView>
  );
}
