import type { Product } from './Product';

export type RootStackParamList = {
  Index: undefined;
  Search: undefined;
  Results: { results: Product[] };
  ProductDetails: { product: Product };
  SwagelokLookup: undefined;
  ParkerLookup: undefined;
  Browse: undefined;
  FilterView: undefined;
  List: undefined;
};