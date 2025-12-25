import { useState } from 'react'
import { Table, TableBody } from '@shared/ui/table'
import { useLogin, useCases } from './hooks/useCases'
import { transformApiCase, processCasesData } from './utils/transformCase'
import { TableHeader } from './components/TableHeader'
import { CaseRow } from './components/CaseRow'
import { LoadingState, ErrorState, EmptyState } from './components/TableStates'
import { Pagination } from './components/Pagination'

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Login query
  const { data: loginData, isLoading: isLoggingIn } = useLogin()

  // Fetch cases only after we have a token
  // Fetch 50 cases from API but display 20 per page
  const { data: casesData, isLoading: isLoadingCases, error, isError } = useCases(
    loginData?.token,
    50
  )

  // Process cases data from API response
  const cases = processCasesData(casesData, transformApiCase)

  const totalItems = cases.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCases = cases.slice(startIndex, endIndex)

  const isLoading = isLoggingIn || isLoadingCases

  return (
    <div className="w-full">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader />
            <TableBody>
              {isLoading ? (
                <LoadingState />
              ) : isError ? (
                <ErrorState error={error as Error | null} />
              ) : cases.length === 0 ? (
                <EmptyState />
              ) : (
                paginatedCases.map((caseItem, index) => (
                  <CaseRow key={caseItem.id} caseItem={caseItem} index={index} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default DataTable

