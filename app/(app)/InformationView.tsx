import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function InformationView(): JSX.Element {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">How to Use the App</Text>
      <Text className="text-base leading-relaxed mb-6">
        This app allows you to look up product information based on TGCI, Swagelok, or Parker part numbers.
        Start by entering a part number into the search bar on the Home tab. If you prefer to browse,
        use the Browse tab to look through available product databases. You can also filter results
        by brand or category to narrow down your search.
      </Text>

      <Text className="text-xl font-bold mb-4">Contact Information</Text>
      <View className="space-y-2">
        <Text className="text-base">Email: support@tgci.com</Text>
        <Text className="text-base">Phone: (123) 456-7890</Text>
        <Text className="text-base">Website: https://tgci.com</Text>
      </View>
    </ScrollView>
  );
}
