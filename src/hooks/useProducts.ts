import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/services/api'

export function useProducts(page: number, title: string, categoryId: number | null) {
  return useQuery({
    queryKey: ['products', { page, title, categoryId }],
    queryFn: () => fetchProducts({ page, title, categoryId, limit: 10 }),
    placeholderData: (prev) => prev,
    staleTime: 100 * 20,
  })
}
