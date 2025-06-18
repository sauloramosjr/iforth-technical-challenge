import TCreateProduct from '../types/TCreateProduct';

export async function createProduct(data: TCreateProduct) {
  const response = await fetch('/api/registers/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar produto');
  }

  return response.json();
}
