import Header from '@/components/Dashboard/header'
import DataTable from '@/components/Dashboard/DataTable'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Cases</h2>
            <p className="text-muted-foreground">
              Manage and track all your pathology cases
            </p>
          </div>
          <DataTable />
        </div>
      </div>
    </>
  )
}

