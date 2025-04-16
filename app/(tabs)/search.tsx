import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import NetInfo from '@react-native-community/netinfo';
import { supabase } from '@/config/supabase';
import { getCachedProducts } from '@/storage/localCache';
import { router } from 'expo-router';
import type { Product, Brand, Category, ProductImage } from '@/types';

export default function SearchView(): JSX.Element {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadCached = async () => {
      const cached = await getCachedProducts();
      setProducts(cached);
    };
    loadCached();
  }, []);

  const runSearch = async () => {
    if (query.trim() === '') {
      setFiltered([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    setLoading(true);

    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`part_number.ilike.%${query}%,swagelok_part_number.ilike.%${query}%,parker_part_number.ilike.%${query}%`);

        if (error) throw error;

        if (data && data.length > 0) {
          setFiltered(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase search failed, falling back to local.', err);
      }
    }

    const localResults = products.filter(p =>
      p.part_number?.toLowerCase().includes(lowerQuery) ||
      p.swagelok_part_number?.toLowerCase().includes(lowerQuery) ||
      p.parker_part_number?.toLowerCase().includes(lowerQuery)
    );
    setFiltered(localResults);
    setLoading(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) runSearch();
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const getMatchLabel = (product: Product) => {
    const q = query.toLowerCase();
    if (product.swagelok_part_number?.toLowerCase().includes(q)) return 'Swagelok';
    if (product.parker_part_number?.toLowerCase().includes(q)) return 'Parker';
    if (product.part_number?.toLowerCase().includes(q)) return 'TGCI';
    return 'Product';
  };

  const getMatchValue = (product: Product) => {
    const q = query.toLowerCase();
    if (product.swagelok_part_number?.toLowerCase().includes(q)) return product.swagelok_part_number;
    if (product.parker_part_number?.toLowerCase().includes(q)) return product.parker_part_number;
    if (product.part_number?.toLowerCase().includes(q)) return product.part_number;
    return product.product_name;
  };

  const goToResults = () => {
    const resultString = JSON.stringify(filtered);
    router.push({ pathname: '/ResultsView', params: { results: resultString } });
  };  
  const clearSearch = () => {
    setQuery('');
    setFiltered([]);
  };
  const goToBrowseOptions = () => router.push('/browse-options');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 p-4">
      <Text className="text-xl font-bold mb-3">Search Products</Text>
      <SearchBar value={query} onChange={setQuery} />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" className="mt-5" />
      ) : (
        filtered.length > 0 && (
          <FlatList
            data={filtered.slice(0, 10)}
            keyExtractor={item => item.product_id?.toString() || item.sku || Math.random().toString()}
            renderItem={({ item }) => {
              const label = getMatchLabel(item);
              const value = getMatchValue(item);
              return (
                <TouchableOpacity
                onPress={() => router.push(`/product/${item.product_id}`)}
                className="py-3 border-b border-gray-200"
                >
                  <Text className="text-lg font-medium">{value}</Text>
                  <Text className="text-sm text-gray-500 mt-1">{label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )
      )}

      <View className="flex-row justify-between mt-6 gap-4">
        <Button title="View All Results" onPress={goToResults} disabled={filtered.length === 0 || loading} />
        <Button title="Clear" onPress={clearSearch} color="#FF3B30" />
      </View>

      <TouchableOpacity onPress={goToBrowseOptions} className="mt-6 items-center">
        <Text className="text-base text-blue-600 underline">Or Browse the Database</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
