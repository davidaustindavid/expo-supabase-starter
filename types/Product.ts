// types/Product.ts
export interface Product {
    product_id: string;
    sku: string;
    description?: string | null;
    long_description?: string | null;
    category_id?: string | null;
    brand_id?: string | null;
    base_price: number;
    sale_price?: number | null;
    cost_price?: number | null;
    stock_quantity: number;
    low_stock_threshold?: number | null;
    weight?: number | null;
    weight_unit?: string | null;
    dimensions?: string | null;
    is_active?: boolean;
    is_featured?: boolean;
    tax_rate?: number | null;
    created_at?: string;
    updated_at?: string;
    short_description?: string | null;
    swagelok_part_number?: string | null;
    parker_part_number?: string | null;
    part_number?: string | null;
    list_price?: number | null;
    list_price_increase?: number | null;
    product_name: string;
    specifications?: Record<string, any> | null; // since it's jsonb
  }
  