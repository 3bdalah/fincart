import React from 'react'
import { useCategories } from '@/hooks/useCategories'

interface Props {
  title: string
  setTitle: (s: string) => void
  categoryId: number | null
  setCategoryId: (n: number | null) => void
}

export default function SearchFilter({ title, setTitle, categoryId, setCategoryId }: Props) {
  const { data: categories, isLoading } = useCategories()

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full md:w-64">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={categoryId ?? ''}
          onChange={(e) => {
            const v = e.target.value
            setCategoryId(v ? Number(v) : null)
          }}
          className="w-full px-3 py-2 rounded-xl border bg-white"
        >
          <option value="">All</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            categories?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  )
}
