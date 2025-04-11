// app/(app)/SwagelokLookupView.tsx
import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { getCachedProducts } from '@/storage/localCache';
import { router } from 'expo-router';

interface Product {
  id: string;
  part_number?: string;
  swagelok_part_number?: string;
}

export default function SwagelokLookupView(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadProducts = async () => {
      const all = await getCachedProducts();
      const swagelok = all.filter((p: Product) => p.swagelok_part_number);
      setProducts(swagelok);
      setFiltered(swagelok);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(products);
      return;
    }
    const q = query.toLowerCase();
    const results = products.filter(p =>
      p.part_number?.toLowerCase().includes(q) ||
      p.swagelok_part_number?.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4">Swagelok Lookup</Text>
      <TextInput
        placeholder="Search TGCI or Swagelok part number"
        value={query}
        onChangeText={setQuery}
        className="h-10 border border-gray-300 rounded px-3 mb-4"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View className="flex-row bg-gray-100 py-2 border-b border-gray-300">
            <Text className="flex-1 font-bold text-base">TGCI Part #</Text>
            <Text className="flex-1 font-bold text-base">Swagelok Part #</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.product_id}`)}>
            <View className={`flex-row py-2 border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <Text className="flex-1 text-base">{item.part_number || '-'}</Text>
              <Text className="flex-1 text-base">{item.swagelok_part_number || '-'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
