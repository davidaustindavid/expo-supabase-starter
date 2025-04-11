import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Product = {
  name: string;
  sku: string;
};

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{product.name}</Text>
        <Text>{product.sku}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
  },
});