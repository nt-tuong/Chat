import { useEffect, useState } from "react";
import { Product } from "./model";
import RedisShoppingCart from "./RedisShoppingCart";

const products: Product[] = [
  { id: "1", name: "Laptop Dell XPS", price: 25000000, quantity: 100 },
  { id: "2", name: "iPhone 15 Pro", price: 28000000, quantity: 100 },
  { id: "3", name: "AirPods Pro", price: 5500000, quantity: 100 },
  { id: "4", name: "iPad Air", price: 15000000, quantity: 100 },
];

const RedisUI = () => {
  useEffect(() => {
    document.title = "Redis Demo";
  }, []);

  return <RedisShoppingCart products={products} />;
};

export default RedisUI;
