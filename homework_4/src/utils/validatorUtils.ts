export const validateData = (data: any, schema: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw error;
  }
  
  return value;
}
