import { TableHead, TableHeader as ShadcnTableHeader, TableRow } from '@shared/ui/table'

export const TableHeader = () => {
  return (
    <ShadcnTableHeader>
      <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border-b-2 border-gray-300">
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Case ID
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Status
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Priority
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Tags
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Assignee
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Date
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Description
        </TableHead>
        <TableHead className="h-18 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider text-left">
          Slides
        </TableHead>
      </TableRow>
    </ShadcnTableHeader>
  )
}

