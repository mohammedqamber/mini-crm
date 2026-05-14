// src/modules/leads/components/form-fields/FormInput.tsx
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
};

export function FormInput<T extends FieldValues>({
  id,
  label,
  error,
  required,
  placeholder,
  type = "text",
  register,
  rules,
}: Props<T>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
