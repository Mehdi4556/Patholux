import { useQuery } from '@tanstack/react-query'
import type { LoginResponse, CasesResponse } from '@/types/cases'
import { API_BASE_URL } from '@/lib/constant'

export const useLogin = () => {
  return useQuery<LoginResponse>({
    queryKey: ['login'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'user@patholux.com',
          password: 'passwortpasswort',
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Login failed: ${res.status} ${res.statusText}`)
        }
        return res.json() as Promise<LoginResponse>
      }),
    staleTime: Infinity, // Token doesn't expire during session
    retry: 2,
  })
}

export const useCases = (token: string | undefined, itemsPerPage: number) => {
  return useQuery<CasesResponse>({
    queryKey: ['cases'],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/case?status=OPEN_UNSEEN,OPEN&limit=${itemsPerPage}&orderBy=externalId||ASC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      return result as CasesResponse
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    retry: 1,
  })
}

