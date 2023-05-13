export const isEmptyString = (string: string): boolean => {
  return !string || /^\s*$/.test(string);
};

export const isEmailValid = (email: string): boolean => {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) return true;

  return false;
};

export const isPasswordValid = (password: string): boolean => {
  if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) return true;

  return false;
};

export const findUniqueFieldError = async (table: any, field: string, value: string) => {
  const uniqueField = await table.findUnique({
    where: {
      [field]: value
    }
  });
  return uniqueField;
};
