import { useMemo } from "react";
import { Product } from "../model";
import ProductRow from "../ProductRow";

interface ProductPanelProps {
  product: Product;
}

const ProductPanel = ({ product }: ProductPanelProps) => {
  console.log("re-render!", product);
  const rows = useMemo(() => {
    return 1;
  }, []);
  return <>ProductRow</>;
};

export default ProductPanel;
