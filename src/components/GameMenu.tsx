'use client'
import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PlayerAmt } from "./Game";
import { useAuth } from '@/context/AuthContext';
import { Button, COLORS } from "@/components/Button";

const MODES = [
  { players: 3, label: "Trio", color: "amber", tilt: "-1" },
  { players: 2, label: "Duo",  color: "emerald",  tilt: "1" },
  { players: 1, label: "Solo", color: "sky",   tilt: "-2" },
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
        {MODES.map(({ players, label, color, tilt }) => (
          <Button
            key={players}
            label={label}
            color={color}
            size="lg"
            tilt={tilt}
            accessibilityLabel={`${label}, ${players} ${players === 1 ? "player" : "players"}`}
            onPress={() => onPressed(players)}
          >
            <View className="flex-row gap-2">
              {Array.from({ length: players }).map((_, i) => (
                <Ionicons key={i} name="person" size={48} color={COLORS[color].hex} />
              ))}
            </View>
          </Button>
        ))}
      </View>
    </SafeAreaView>
  );
}
