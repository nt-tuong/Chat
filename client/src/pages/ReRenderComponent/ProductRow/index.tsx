import { Control, Path } from "react-hook-form";

import CustomInputValidation from "../CustomInputValidation";
import { ProductItem } from "../model";

interface ProductRowProps {
  control: Control<ProductItem>;
  index: number;
}

const ProductRow = ({ control, index }: ProductRowProps) => {
  const fieldPath = `productItems.${index}.name` as Path<ProductItem>;

  const handleClick = () => {
    console.log(123);
  };

  return (
    <>
      <button onClick={handleClick}></button>
      <CustomInputValidation control={control} name={fieldPath} />
    </>
  );
};

export default ProductRow;
