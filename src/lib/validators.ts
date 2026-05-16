export const isRequired = (
  value: string,
  fieldName = "This field",
): true | string => {
  if (!value.trim()) return `${fieldName} is required`;
  return true;
};

export const validateEmail = (value: string): true | string => {
  if (!value.trim()) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email";

  return true;
};

export const validatePhone = (value: string): true | string => {
  if (!value.trim()) return true; // optional
  const phoneRegex = /^[+\d][\d\s()-]{6,}$/;
  if (!phoneRegex.test(value)) return "Please enter a valid phone number";
  return true;
};
