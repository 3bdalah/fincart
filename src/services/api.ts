const BASE_URL = 'https://api.escuelajs.co/api/v1'

export async function fetchProducts(params: {
  page: number;
  limit?: number;
  title?: string;
  categoryId?: number | null;
}) {
  const limit = params.limit ?? 10
  const offset = params.page * limit

  const url = new URL(BASE_URL + '/products')
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('limit', String(limit))
  if (params.title && params.title.trim()) {
    url.searchParams.set('title', params.title.trim())
  }
  if (params.categoryId) {
    url.searchParams.set('categoryId', String(params.categoryId))
  }

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(BASE_URL + '/categories')
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}
