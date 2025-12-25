import { CheckCircle2, AlertCircle } from 'lucide-react'
import type { Case } from '@/types/cases'

// Status Badge
type StatusBadgeProps = {
  status: Case['status']
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'open') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Open
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
      <AlertCircle className="h-3.5 w-3.5" />
      Unseen
    </span>
  )
}

// Priority Badge
type PriorityBadgeProps = {
  priority: Case['priority']
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const colors = {
    high: 'bg-red-500 shadow-red-200 group-hover:bg-red-600 group-hover:shadow-md',
    medium: 'bg-orange-500 shadow-orange-200 group-hover:bg-orange-600 group-hover:shadow-md',
    low: 'bg-emerald-500 shadow-emerald-200 group-hover:bg-emerald-600 group-hover:shadow-md',
  }
  const labels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  }
  const textColors = {
    high: 'text-red-700 group-hover:text-red-800',
    medium: 'text-orange-700 group-hover:text-orange-800',
    low: 'text-emerald-700 group-hover:text-emerald-800',
  }
  return (
    <div className="flex items-center gap-2.5">
      <div className={`h-2.5 w-2.5 rounded-full ${colors[priority]} shadow-sm`} />
      <span className={`text-sm font-medium ${textColors[priority]}`}>{labels[priority]}</span>
    </div>
  )
}

// Tag Badge
type TagBadgeProps = {
  tag: string
}

export const TagBadge = ({ tag }: TagBadgeProps) => {
  if (!tag || typeof tag !== 'string') {
    return null
  }
  const styles: Record<string, string> = {
    Skin: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:bg-rose-100 group-hover:shadow-md',
    Intestine: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100 group-hover:shadow-md',
    Biopsy: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:shadow-md',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border shadow-sm ${styles[tag] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
    >
      {String(tag)}
    </span>
  )
}

// Assignee Display
type AssigneeDisplayProps = {
  assignee: Case['assignee']
}

export const AssigneeDisplay = ({ assignee }: AssigneeDisplayProps) => {
  if (!assignee || !assignee.name) {
    return (
      <span className="text-base text-gray-500 font-medium">
        Unassigned
      </span>
    )
  }
  return (
    <div className="flex flex-col">
      <span className="text-base font-medium text-gray-900">{assignee.name || 'Unknown'}</span>
      {assignee.date && (
        <span className="text-sm text-gray-500 mt-0.5">{assignee.date}</span>
      )}
    </div>
  )
}

