import React, { useEffect, useState } from 'react';
import { View, Text, Picker, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { getCachedProducts, fetchAndCacheProducts } from '../../storage/localCache';
import type { Product } from '../types';

export default function FilterView(): JSX.Element {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const load = async () => {
      const all = await getCachedProducts();
      setProducts(all);
      setBrands([...new Set(all.map(p => p.brand).filter(Boolean))]);
      setCategories([...new Set(all.map(p => p.category).filter(Boolean))]);
    };
    load();
  }, []);

  const applyFilter = () => {
    const filtered = products.filter(p => {
      const brandMatch = selectedBrand ? p.brand === selectedBrand : true;
      const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
      return brandMatch && categoryMatch;
    });
    navigation.navigate('Results', { results: filtered });
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Filter Products</Text>

      <Text className="text-base font-semibold mb-2">Brand</Text>
      <View className="border border-gray-300 rounded mb-4">
        <Picker
          selectedValue={selectedBrand}
          onValueChange={setSelectedBrand}
        >
          <Picker.Item label="All Brands" value="" />
          {brands.map(b => (
            <Picker.Item key={b} label={b} value={b} />
          ))}
        </Picker>
      </View>

      <Text className="text-base font-semibold mb-2">Category</Text>
      <View className="border border-gray-300 rounded mb-6">
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map(c => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <Button title="Apply Filter" onPress={applyFilter} color="#007AFF" />
    </ScrollView>
  );
}
