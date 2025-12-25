import { TableHead, TableHeader as ShadcnTableHeader, TableRow } from '@shared/ui/table'

export const TableHeader = () => {
  return (
    <ShadcnTableHeader>
      <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border-b-2 border-gray-300">
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Case ID
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Status
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Priority
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Tags
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Assignee
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Date
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Description
        </TableHead>
        <TableHead className="h-18 px-6 py-4 font-bold text-gray-800 text-sm uppercase tracking-wider text-left align-top">
          Slides
        </TableHead>
      </TableRow>
    </ShadcnTableHeader>
  )
}

