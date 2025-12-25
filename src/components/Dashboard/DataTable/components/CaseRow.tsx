import { TableCell, TableRow } from '@shared/ui/table'
import { Calendar, FileText } from 'lucide-react'
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
      className={`border-b border-gray-100 last:border-b-0 ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
      } hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-indigo-50/60 hover:to-blue-50/80 hover:shadow-lg hover:border-l-4 hover:border-l-blue-500 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer group`}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 80}ms both`,
      }}
    >
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-center h-full">
          <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 ease-in-out text-base tracking-tight inline-block">
            {caseItem.caseId || 'N/A'}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-center h-full">
          <div className="transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <StatusBadge status={caseItem.status || 'open'} />
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-center h-full">
          <div className="transform group-hover:translate-x-0.5 transition-transform duration-300 ease-in-out">
            <PriorityBadge priority={caseItem.priority || 'medium'} />
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-start gap-2 flex-wrap">
          {Array.isArray(caseItem.tags) && caseItem.tags.length > 0 ? (
            caseItem.tags
              .filter((tag: string) => tag && typeof tag === 'string')
              .map((tag: string, tagIndex: number) => {
                const badge = <TagBadge tag={tag} />
                return badge ? (
                  <span 
                    key={`${tag}-${tagIndex}`}
                    className="transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
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
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-start h-full">
          <div className="transform group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
            <AssigneeDisplay assignee={caseItem.assignee || { name: null, initial: null, date: null }} />
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-center gap-2.5 h-full">
          <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300 ease-in-out flex-shrink-0" />
          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
            {caseItem.date || 'N/A'}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-center h-full">
          <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
            {caseItem.description || 'No description'}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-7 align-top">
        <div className="flex items-center gap-2.5 h-full">
          <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300 ease-in-out flex-shrink-0" />
          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
            {caseItem.slides?.reviewed || 0} / {caseItem.slides?.total || 0}
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}

