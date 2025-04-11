import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { Product } from '../types';

export default function ProductDetailsView(): JSX.Element {
  const route = useRoute();
  const { product }: { product: Product } = route.params as any;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-2">{product.product_name}</Text>
      <Text className="text-base text-gray-600 mb-4">{product.short_description}</Text>

      {product.product_image && (
        <Image
          source={{ uri: product.product_image }}
          className="w-full h-48 rounded mb-4"
          resizeMode="contain"
        />
      )}

      <View className="space-y-1">
        <Text className="text-base font-semibold">TGCI Part Number:</Text>
        <Text>{product.part_number || '-'}</Text>

        <Text className="text-base font-semibold mt-2">Swagelok Part Number:</Text>
        <Text>{product.swagelok_part_number || '-'}</Text>

        <Text className="text-base font-semibold mt-2">Parker Part Number:</Text>
        <Text>{product.parker_part_number || '-'}</Text>

        {product.specifications && (
          <View className="mt-4">
            <Text className="text-lg font-bold mb-1">Specifications</Text>
            <Text className="text-sm text-gray-700 whitespace-pre-line">
              {product.specifications}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}