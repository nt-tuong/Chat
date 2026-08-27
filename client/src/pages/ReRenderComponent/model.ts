export interface Product {
  id: string;
  productItems: ProductItem[];
}
export interface ProductItem {
  id: string;
  name: string;
  type: number;
  price: number;
  quantity: number;
}
