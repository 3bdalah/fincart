import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  page: number
  setPage: (n: number) => void
  hasNextPage: boolean
}

export default function Pagination({ page, setPage, hasNextPage }: Props) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        onClick={() => setPage(Math.max(0, page - 1))}
        disabled={page === 0}
        className="px-3 py-2 rounded-xl border flex items-center gap-1 disabled:opacity-50 hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <span className="text-sm font-medium">Page {page + 1}</span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasNextPage}
        className="px-3 py-2 rounded-xl border flex items-center gap-1 disabled:opacity-50 hover:bg-gray-100 transition"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
