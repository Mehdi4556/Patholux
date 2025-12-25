import { createFileRoute } from '@tanstack/react-router'
import Cases from '@/pages/cases'

export const Route = createFileRoute('/cases')({
  component: Cases,
})

