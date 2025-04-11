import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from '@/components/ProductCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { router } from 'expo-router';
import type { Product } from '@/types/Product';

export default function ResultsView(): JSX.Element {
  const router = useRouter();
  const { results } = useLocalSearchParams();
  let parsedResults: Product[] = [];

  try {
    parsedResults = Array.isArray(results)
      ? JSON.parse(results[0])
      : JSON.parse(results as string);
  } catch (err) {
    console.warn('Failed to parse results:', err);
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-3">Search Results ({parsedResults.length})</Text>
      {parsedResults.length === 0 ? (
        <Text className="text-base text-gray-500 mt-4">No results found.</Text>
      ) : (
        <FlatList
          data={parsedResults}
          keyExtractor={(item: Product) => item.product_id?.toString() || item.sku || Math.random().toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => router.push(`/product/${item.product_id}`)}
              />
          )}
        />
      )}
    </View>
  );
}
