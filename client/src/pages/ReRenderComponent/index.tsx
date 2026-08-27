import { useLayoutEffect } from "react";
import ProductPanel from "./ProductPanel";
import { Product } from "./model";
import { FormProvider, useForm } from "react-hook-form";

const product: Product = {
  id: "cart",
  productItems: [
    { id: "1", type: 1, name: "iPhone 15 Pro", price: 28000000, quantity: 100 },
    { id: "2", type: 1, name: "AirPods Pro", price: 5500000, quantity: 100 },
    {
      id: "3",
      type: 2,
      name: "Laptop Dell XPS",
      price: 25000000,
      quantity: 100,
    },
  ],
};

const ReRenderComponent = () => {
  const formMethods = useForm<Product>({
    defaultValues: product,
  });

  useLayoutEffect(() => {
    document.title = "Re-Render Component";
  }, []);

  return (
    <FormProvider {...formMethods}>
      <ProductPanel product={product} />
    </FormProvider>
  );
};

export default ReRenderComponent;
