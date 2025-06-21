const validateBody = <T>(
  body: Record<string, any>,
  requiredKeys: (keyof T)[]
) =>{
  const missing = requiredKeys.filter((key) => !(key in body));

  if (missing.length > 0) {
    return {
      success: false,
      missing,
      message: `Campos obrigatórios ausentes: ${missing.join(', ')}`,
    };
  }

  return {
    success: true,
    message: 'Body válido',
  };
}

export default validateBody