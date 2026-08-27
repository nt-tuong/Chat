import { Path, Control, Controller, FieldValues } from "react-hook-form";

interface CustomInputValidationProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  readOnly?: boolean;
}

const CustomInputValidation = <T extends FieldValues>({
  control,
  name,
  readOnly,
}: CustomInputValidationProps<T>) => {
  console.log("re-render!");
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <input
            type="text"
            autoComplete="new-password"
            data-lpignore="true"
            data-1p-ignore
          />
        );
      }}
    />
  );
};

export default CustomInputValidation;
