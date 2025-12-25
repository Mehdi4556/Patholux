import { Button } from '@shared/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  isLoading,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <div className="text-sm text-gray-600">
        {isLoading ? (
          'Loading...'
        ) : (
          `Showing ${startIndex + 1} to ${Math.min(endIndex, totalItems)} of ${totalItems} cases`
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

