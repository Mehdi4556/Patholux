import { TableCell, TableRow } from '@shared/ui/table'
import { Calendar, } from 'lucide-react'
import type { Case } from '@/types/cases'
import { StatusBadge, PriorityBadge, TagBadge, AssigneeDisplay } from './Badges'

type CaseRowProps = {
  caseItem: Case
  index: number
}

export const CaseRow = ({ caseItem, index }: CaseRowProps) => {
  // Ensure we have a valid case item
  if (!caseItem || !caseItem.id) {
    return null
  }
  
  return (
    <TableRow
      key={caseItem.id}
      className={`border-b border-gray-100 last:border-b-0 border-l-0 ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
      } hover:bg-blue-50/50 hover:shadow-md hover:border-l-4 hover:border-l-blue-500 transition-all duration-150 ease-out cursor-pointer group`}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 80}ms both`,
      }}
    >
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start">
          <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-150 ease-out text-base tracking-tight">
            {caseItem.caseId || caseItem.id || 'N/A'}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start">
          <StatusBadge status={caseItem.status || 'open'} />
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start">
          <PriorityBadge priority={caseItem.priority || 'medium'} />
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start gap-2 flex-wrap">
          {Array.isArray(caseItem.tags) && caseItem.tags.length > 0 ? (
            caseItem.tags
              .filter((tag: string) => tag && typeof tag === 'string')
              .map((tag: string, tagIndex: number) => {
                const badge = <TagBadge tag={tag} />
                return badge ? (
                  <span 
                    key={`${tag}-${tagIndex}`}
                  >
                    {badge}
                  </span>
                ) : null
              })
          ) : (
            <span className="text-sm text-gray-400">No tags</span>
          )}
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start">
          <AssigneeDisplay assignee={caseItem.assignee || { name: null, initial: null, date: null }} />
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start gap-2.5">
          <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-150 ease-out flex-shrink-0 mt-0.5" />
          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-150 ease-out">
            {caseItem.date || 'N/A'}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start">
          <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-150 ease-out">
            {caseItem.description || 'No description'}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 align-top">
        <div className="flex items-start gap-2.5">
          {/* <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-150 ease-out flex-shrink-0 mt-0.5" /> */}
          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-150 ease-out">
            {caseItem.slides?.reviewed || 0} / {caseItem.slides?.total || 0}
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}

