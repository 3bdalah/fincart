import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartCount, selectCartTotal } from './cartSlice'

export default function CartSummary() {
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)

  return (
    <div className="inline-flex items-center gap-3 text-sm">
      <span className="px-2 py-1 rounded-full bg-gray-100">Items: {count}</span>
      <span className="px-2 py-1 rounded-full bg-gray-100">Total: ${total.toFixed(2)}</span>
    </div>
  )
}
