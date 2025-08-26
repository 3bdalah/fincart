import React, { useMemo, useState } from 'react'
import ProductList from '@/components/ProductList'
import Pagination from '@/components/Pagination'
import { useProducts } from '@/hooks/useProducts'
import SearchFilter from '@/components/SearchFilter'
import { useDebouncedValue } from '@/utils/useDebouncedValue'
import ErrorBoundary from '@/components/ErrorBoundary'
import { SearchX } from 'lucide-react' // ❌ search not found icon

export default function Home() {
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const debouncedTitle = useDebouncedValue(title, 400)

  const { data, isLoading, isError, error, isFetching } = useProducts(
    page,
    debouncedTitle,
    categoryId
  )

  const products = useMemo(() => (Array.isArray(data) ? data : []), [data])

  return (
    <div>
      <SearchFilter
        title={title}
        setTitle={setTitle}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      <ErrorBoundary>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-6 rounded-xl border bg-red-50 text-red-700">
            {(error as Error)?.message || 'Something went wrong while fetching products.'}
          </div>
        ) : products.length === 0 ? (
          
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <SearchX className="w-12 h-12 mb-3 text-gray-400" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <ProductList products={products} />
            <Pagination
              page={page}
              setPage={setPage}
              hasNextPage={products.length === 10}
            />
          </>
        )}
      </ErrorBoundary>

      {isFetching && !isLoading && (
        <div className="mt-4 text-center text-sm text-gray-500">Updating…</div>
      )}
    </div>
  )
}
