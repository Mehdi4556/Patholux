import { TableCell, TableRow } from '@shared/ui/table'
import { Button } from '@shared/ui/button'
import { Loader2, AlertCircle, FileText } from 'lucide-react'

export const LoadingState = () => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading cases...</p>
        </div>
      </TableCell>
    </TableRow>
  )
}

type ErrorStateProps = {
  error: Error | null
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-red-600 font-semibold">Error loading cases</p>
            <p className="text-gray-500 text-sm mt-1">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export const EmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <FileText className="h-8 w-8 text-gray-400" />
          <p className="text-gray-600">No cases found</p>
        </div>
      </TableCell>
    </TableRow>
  )
}

