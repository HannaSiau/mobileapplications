import { useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";

export default function RegisterScreen() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

  const handleRegister = async () => {
    setError('');
    try {
      await register(email.trim(), password, userName);
      router.replace('/');
    } catch {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-indigo-950 px-6">
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 items-center justify-center"
        >
        <Text className="mb-2 -rotate-2 text-5xl font-black text-white">Monster Mash!</Text>
        <Text className="mb-10 text-lg font-semibold text-indigo-300">Welcome back</Text>

        <View className="w-full max-w-sm gap-4">
            <View className="gap-2">
                <Text className="ml-2 text-sm font-bold text-indigo-300">Name</Text>
                <TextInput
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor="#818CF8"
                placeholder="your name"
                autoCapitalize="none"
                className="rounded-3xl border-4 border-indigo-400 px-5 py-4 text-lg font-semibold text-white"
                />
            </View>
            <View className="gap-2">
                <Text className="ml-2 text-sm font-bold text-indigo-300">Email</Text>
                <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#818CF8"
                placeholder="you@example.com"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                testID="email-input"
                className="rounded-3xl border-4 border-indigo-400 px-5 py-4 text-lg font-semibold text-white"
                />
            </View>

            <View className="gap-2">
                <Text className="ml-2 text-sm font-bold text-indigo-300">Password</Text>
                <TextInput
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#818CF8"
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                testID="password-input"
                className="rounded-3xl border-4 border-indigo-400 px-5 py-4 text-lg font-semibold text-white"
                />
            </View>

            {error !== '' && (
                <Text className="text-center text-base font-semibold text-pink-400">{error}</Text>
            )}
            <Button label="Register" color="amber" size="lg" tilt="0" onPress={handleRegister} />

            <Pressable
                onPress={() => router.replace('/')}
                accessibilityRole="button"
                className="items-center py-3"
            >
                <Text className="text-base font-semibold text-indigo-300">Continue as guest</Text>
            </Pressable>
        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}