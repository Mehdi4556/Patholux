import Header from '@/components/Dashboard/header'
import DataTable from '@/components/Dashboard/DataTable'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <DataTable />
      </div>
    </>
  )
}

