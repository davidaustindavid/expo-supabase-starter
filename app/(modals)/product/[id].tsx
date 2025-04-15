import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';
import { Product } from '@/types/Product';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', id)
        .single();

      if (error) {
        console.error('❌ Error fetching product:', error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    if (id) loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-2">{product.product_name}</Text>
      <Text className="text-gray-500 mb-2">{product.part_number}</Text>
      <Text className="text-sm mb-2">{product.short_description || 'No description available.'}</Text>
      {product.swagelok_part_number && (
        <Text className="text-blue-500 mb-1">Swagelok #: {product.swagelok_part_number}</Text>
      )}
      {product.parker_part_number && (
        <Text className="text-green-500 mb-1">Parker #: {product.parker_part_number}</Text>
      )}
      {/* Add more fields as needed */}
    </ScrollView>
  );
}
