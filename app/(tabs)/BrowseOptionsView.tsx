import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function BrowseOptionsView(): JSX.Element {
  const router = useRouter();

  return (
    <View className="flex-1 p-4 justify-center bg-white">
      <Text className="text-xl font-bold text-center mb-6">Browse Products</Text>

      <TouchableOpacity
        onPress={() => router.push('/SwagelokLookupView')}
        className="bg-blue-600 p-4 rounded-xl mb-4"
      >
        <Text className="text-white text-lg text-center font-semibold">Swagelok Lookup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/ParkerLookupView')}
        className="bg-green-600 p-4 rounded-xl"
      >
        <Text className="text-white text-lg text-center font-semibold">Parker Lookup</Text>
      </TouchableOpacity>
    </View>
  );
}