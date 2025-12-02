'use client'

import { Button } from './ui/button'

interface PaginationProps {
  page: number
  totalPages: number
  onChangePage: (page: number) => void
}

export function Pagination({
  page,
  totalPages,
  onChangePage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages ?? 1}
      </p>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChangePage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChangePage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
