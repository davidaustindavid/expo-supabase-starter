import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { Product } from '../../types';

export default function ResultsView(): JSX.Element {
  const router = useRouter();
  const { results } = useLocalSearchParams();

  const parsedResults: Product[] = Array.isArray(results)
    ? JSON.parse(results[0]) // if passed as a stringified array
    : JSON.parse(results as string); // normal case

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-3">Search Results ({parsedResults.length})</Text>
      {parsedResults.length === 0 ? (
        <Text className="text-base text-gray-500 mt-4">No results found.</Text>
      ) : (
        <FlatList
          data={parsedResults}
          keyExtractor={(item: Product) => item.id?.toString() || item.sku || Math.random().toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => router.push({ pathname: '/product-details', params: { product: JSON.stringify(item) } })}
            />
          )}
        />
      )}
    </View>
  );
}
