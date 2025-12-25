import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@shared/ui/button'

const Header = () => {
  const router = useRouterState()
  const currentPath = router.location.pathname
  const isDashboard = currentPath === '/'
  const isCases = currentPath === '/cases'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/patholux-logo.webp"
                alt="Patholux Logo"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
              Patholux
            </h1>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 shadow-sm">
            <Link to="/" className="relative">
              <Button
                variant="ghost"
                className={`relative px-6 py-2.5 font-medium text-sm transition-all duration-300 ease-in-out ${
                  isDashboard
                    ? 'bg-white text-blue-600 shadow-md hover:bg-white hover:text-blue-700 hover:shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Dashboard
                {isDashboard && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Button>
            </Link>
            <Link to="/cases" className="relative">
              <Button
                variant="ghost"
                className={`relative px-6 py-2.5 font-medium text-sm transition-all duration-300 ease-in-out ${
                  isCases
                    ? 'bg-white text-blue-600 shadow-md hover:bg-white hover:text-blue-700 hover:shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Cases
                {isCases && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Button>
            </Link>
          </div>
          
          <div className="h-8 w-px bg-gray-300" />
          
          <Button 
            variant="ghost" 
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out group border border-transparent hover:border-gray-200 hover:shadow-sm"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow-md ring-2 ring-blue-100 group-hover:ring-blue-200 group-hover:scale-105 transition-all duration-300 ease-in-out">
              M
            </div>
            <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Mehdi</span>
            <svg 
              className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header