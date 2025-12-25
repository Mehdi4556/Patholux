import type { ApiCase, Case } from '@/types/cases'

// Transform API response to Case type
export const transformApiCase = (apiCase: ApiCase): Case => {
  try {
    // Handle different case ID field names
    const caseId = apiCase.case_id || apiCase.caseId || apiCase.externalId || apiCase.id || 'N/A'
    
    // Map status: OPEN_UNSEEN -> unseen, OPEN -> open, etc.
    const statusStr = (apiCase.status || '').toUpperCase()
    const status = statusStr.includes('UNSEEN') ? 'unseen' : 'open'
    
    // Map priority
    const priorityStr = (apiCase.priority || 'medium').toLowerCase()
    const priority = (priorityStr === 'high' || priorityStr === 'medium' || priorityStr === 'low') 
      ? priorityStr as 'high' | 'medium' | 'low'
      : 'medium'
    
    // Handle assignee - check assignment.assignedTo structure
    let assigneeName: string | null = null
    let assigneeDate: string | null = null
    
    // Check for assignment.assignedTo structure (primary structure from API)
    if (apiCase.assignment?.assignedTo) {
      const assignedTo = apiCase.assignment.assignedTo
      
      if (typeof assignedTo === 'object' && assignedTo !== null) {
        // Try multiple possible name fields
        const assignedToObj = assignedTo as Record<string, unknown>
        
        // Check for firstname + lastname (API structure)
        const firstname = assignedToObj.firstname as string
        const lastname = assignedToObj.lastname as string
        if (firstname || lastname) {
          assigneeName = [firstname, lastname].filter(Boolean).join(' ').trim() || null
        }
        
        // Fallback to other name formats
        if (!assigneeName) {
          assigneeName = (assignedToObj.name as string) 
            || (assignedToObj.firstName && assignedToObj.lastName 
              ? `${assignedToObj.firstName} ${assignedToObj.lastName}`.trim() 
              : null)
            || (assignedToObj.firstName as string)
            || (assignedToObj.lastName as string)
            || (assignedToObj.username as string)
            || (assignedToObj.email as string)
            || null
        }
      } else if (typeof assignedTo === 'string') {
        assigneeName = assignedTo
      }
      
      // Get assigned date from assignment.assignedFor
      const dateField = apiCase.assignment.assignedFor || apiCase.assignment.assigned_date
      if (dateField) {
        try {
          const date = new Date(dateField)
          if (!isNaN(date.getTime())) {
            assigneeDate = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).replace(/\//g, '.')
          }
        } catch (e) {
          console.warn('Failed to parse assignee date:', e)
        }
      }
    }
    
    // Fallback to other assignee formats
    if (!assigneeName && apiCase.assignee) {
      assigneeName = apiCase.assignee.name || null
      const dateField = apiCase.assignee.assigned_date || apiCase.assignee.assignedDate || apiCase.assignee.date
      if (dateField) {
        try {
          const date = new Date(dateField)
          if (!isNaN(date.getTime())) {
            assigneeDate = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).replace(/\//g, '.')
          }
        } catch (e) {
          console.warn('Failed to parse assignee date:', e)
        }
      }
    }
    
    // Also check for assignee fields at root level
    if (!assigneeName) {
      assigneeName = apiCase.assignedTo || apiCase.assigned_to || apiCase.assigneeName || null
    }
    
    const assignee = assigneeName ? {
      name: assigneeName,
      initial: assigneeName[0]?.toUpperCase() || null,
      date: assigneeDate,
    } : { name: null, initial: null, date: null }

    // Format date with safe parsing - check timestamps.createdAt first
    let formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '.')
    
    const dateStr = apiCase.timestamps?.createdAt 
      || apiCase.date 
      || apiCase.created_at 
      || apiCase.createdAt
    if (dateStr) {
      try {
        const date = new Date(dateStr)
        if (!isNaN(date.getTime())) {
          formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '.')
        }
      } catch (e) {
        console.warn('Failed to parse date:', e)
      }
    }

    return {
      id: apiCase.id || String(caseId),
      caseId: String(caseId),
      status,
      priority,
      tags: Array.isArray(apiCase.tags) 
        ? apiCase.tags.map(tag => typeof tag === 'string' ? tag : tag.label || String(tag))
        : [],
      assignee,
      date: formattedDate,
      description: apiCase.comment || apiCase.description || apiCase.title || apiCase.name || 'No description',
      slides: (() => {
        // Get total slides
        const total = apiCase.slideCount 
          || apiCase.slides_total 
          || apiCase.slidesTotal 
          || apiCase.totalSlides
          || (Array.isArray(apiCase.slides) ? apiCase.slides.length : 0)
          || 0
        
        // Count reviewed slides from slides array
        let reviewed = 0
        if (Array.isArray(apiCase.slides)) {
          reviewed = apiCase.slides.filter((slide: { reviewed?: boolean; status?: string }) => {
            return slide.reviewed === true || slide.status === 'REVIEWED' || slide.status === 'reviewed'
          }).length
        }
        
        // Fallback to other field names
        if (reviewed === 0) {
          reviewed = apiCase.slides_reviewed 
            || apiCase.slidesReviewed 
            || apiCase.reviewedSlides
            || 0
        }
        
        return {
          reviewed,
          total,
        }
      })(),
    }
  } catch (error) {
    console.error('Error transforming case:', error, apiCase)
    // Return a safe default case
    return {
      id: apiCase.id || 'unknown',
      caseId: String(apiCase.case_id || apiCase.caseId || apiCase.externalId || apiCase.id || 'N/A'),
      status: 'open',
      priority: 'medium',
      tags: [],
      assignee: { name: null, initial: null, date: null },
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '.'),
      description: 'Error loading case data',
      slides: { reviewed: 0, total: 0 },
    }
  }
}

// Process cases data from API response
export const processCasesData = (casesData: unknown, transformFn: (apiCase: ApiCase) => Case): Case[] => {
  if (!casesData) return []
  
  // Try different response structures
  if (Array.isArray(casesData)) {
    return casesData.map(transformFn)
  }
  
  if (typeof casesData === 'object' && casesData !== null) {
    const obj = casesData as Record<string, unknown>
    
    // Check for items array (primary structure from API)
    if (Array.isArray(obj.items)) {
      return obj.items.map(transformFn)
    }
    
    // Check for data array
    if (Array.isArray(obj.data)) {
      return obj.data.map(transformFn)
    }
    
    // Check for cases array
    if (Array.isArray(obj.cases)) {
      return obj.cases.map(transformFn)
    }
    
    // Check for results array
    if (Array.isArray(obj.results)) {
      return obj.results.map(transformFn)
    }
    
    // Try to find any array in the object
    const dataArray = Object.values(obj).find(Array.isArray) as ApiCase[] | undefined
    if (dataArray) {
      return dataArray.map(transformFn)
    }
  }
  
  return []
}

