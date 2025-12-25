// Login response type
export type LoginResponse = {
  token: string
  [key: string]: unknown
}

// Cases response type
export type CasesResponse = {
  data?: ApiCase[]
  cases?: ApiCase[]
  items?: ApiCase[]
  results?: ApiCase[]
  [key: string]: unknown
}

// Case data type matching the design
export type Case = {
  id: string
  caseId: string
  status: 'open' | 'unseen'
  priority: 'high' | 'medium' | 'low'
  tags: string[]
  assignee: {
    name: string | null
    initial: string | null
    date: string | null
  }
  date: string
  description: string
  slides: {
    reviewed: number
    total: number
  }
}

// API Response type (adjust based on actual API response)
export type ApiCase = {
  id: string
  case_id?: string
  caseId?: string
  externalId?: string
  status?: string
  priority?: string
  tags?: Array<string | { id?: string; label?: string; color?: string; isTypeTag?: boolean }>
  assignment?: {
    assignedTo?: {
      id?: string
      name?: string
      email?: string
      firstname?: string
      lastname?: string
      [key: string]: unknown
    } | null
    assignedFor?: string
    assigned_date?: string
  } | null
  assignee?: {
    name?: string
    email?: string
    assigned_date?: string
    assignedDate?: string
    date?: string
  } | null
  assignedTo?: string
  assigned_to?: string
  assigneeName?: string
  created_at?: string
  createdAt?: string
  timestamps?: {
    createdAt?: string
    updatedAt?: string
  }
  date?: string
  description?: string
  comment?: string
  title?: string
  name?: string
  slides_reviewed?: number
  slides_total?: number
  slideCount?: number
  slides?: Array<{
    id?: string
    reviewed?: boolean
    status?: string
    [key: string]: unknown
  }>
  slidesReviewed?: number
  slidesTotal?: number
  reviewedSlides?: number
  totalSlides?: number
  [key: string]: unknown // Allow additional fields
}

