import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Search by part number (Swagelok, Parker, or TGCI)"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  input: {
    borderBottomWidth: 1,
    padding: 8,
  },
});
