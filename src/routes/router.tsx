import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { TanstackQuery } from '@/lib/root-provider'

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()
  
  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
    },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      )
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}

