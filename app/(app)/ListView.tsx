import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { Product } from '../types';

export default function ListView(): JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const { items }: { items: Product[] } = route.params as any;

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Results</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id?.toString() || item.sku || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
            className="py-3 border-b border-gray-200"
          >
            <Text className="text-lg font-medium">{item.product_name}</Text>
            <Text className="text-sm text-gray-600">{item.part_number}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
