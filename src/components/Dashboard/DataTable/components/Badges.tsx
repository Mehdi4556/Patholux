import { CheckCircle2, AlertCircle } from 'lucide-react'
import type { Case } from '@/types/cases'

// Status Badge
type StatusBadgeProps = {
  status: Case['status']
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'open') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm group-hover:shadow-md group-hover:bg-emerald-100 transition-all duration-300 ease-in-out">
        <CheckCircle2 className="h-3.5 w-3.5 transform group-hover:rotate-180 transition-transform duration-300 ease-in-out" />
        Open
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm group-hover:shadow-md group-hover:bg-amber-100 transition-all duration-300 ease-in-out">
      <AlertCircle className="h-3.5 w-3.5 animate-pulse" />
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
      <div className={`h-2.5 w-2.5 rounded-full ${colors[priority]} shadow-sm transition-all duration-300 ease-in-out transform group-hover:scale-125`} />
      <span className={`text-sm font-medium ${textColors[priority]} transition-colors duration-300 ease-in-out transform group-hover:translate-x-0.5`}>{labels[priority]}</span>
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
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border shadow-sm transition-all duration-300 ease-in-out transform group-hover:scale-105 ${styles[tag] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
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
      <span className="text-base text-gray-500 group-hover:text-gray-700 transition-colors duration-300 ease-in-out font-medium">
        Unassigned
      </span>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 ease-in-out ring-2 ring-blue-100">
        {assignee.initial || '?'}
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 ease-in-out">{assignee.name || 'Unknown'}</span>
        {assignee.date && (
          <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 ease-in-out">{assignee.date}</span>
        )}
      </div>
    </div>
  )
}

