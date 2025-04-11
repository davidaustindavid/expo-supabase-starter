import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';
import type { Product } from '../types';

const PRODUCTS_KEY = 'products';

/**
 * Fetches all products from Supabase and stores them in local AsyncStorage.
 */
export const fetchAndCacheProducts = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;

    if (Array.isArray(data)) {
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
      console.log(`✅ Cached ${data.length} products locally.`);
    } else {
      console.warn('⚠️ Supabase returned no data.');
    }
  } catch (err) {
    console.error('❌ Failed to fetch from Supabase:', err);
  }
};

/**
 * Loads products from local AsyncStorage.
 * @returns An array of locally cached products.
 */
export const getCachedProducts = async (): Promise<Product[]> => {
  try {
    const raw = await AsyncStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('❌ Failed to load local cache:', err);
    return [];
  }
};
