import SaleChart from "@/components/dashboard/SaleChart"
import CountUpCom from "@/components/shared/CountUpCom"
import DashBoardCard from "@/components/shared/DashBoardCard"
import { Separator } from "@/components/ui/separator"

import { getSalesPerMonth, getTotalCustomers, getTotalSales } from "@/lib/action/dashboard.action"
import { BadgeDollarSign } from "lucide-react"

const DashBoardPage = async () => {
  const { totalOrders, totalRevenue } = await getTotalSales()
  const totalCustomers = await getTotalCustomers()
  const graphData = await getSalesPerMonth()
  return (
    <div className="w-full space-y-4 px-4 py-10 lg:px-10">
      <h1 className="pageTitle">Customers</h1>
      <Separator className="bg-gray-500" />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div className="space-y-10 rounded-2xl bg-white p-4">
          <div className="flexBetween p-2">
            <h1 className="text-2xl font-semibold">Total Revenue</h1>
            <BadgeDollarSign className="max-sm:hidden" size={24} />
          </div>
          <div className="flexCenter w-full text-2xl font-semibold">
            $ <CountUpCom id="totalRevenue" value={totalRevenue} />
          </div>
        </div>
        <DashBoardCard
          href="/orders"
          value={totalOrders}
          id="totalOrder"
          title="Total Orders"
        />
        <DashBoardCard
          href="/customers"
          value={totalCustomers}
          id="totalCustomer"
          title="Total Customers"
        />
      </div>
      <SaleChart data={graphData}/>
    </div>
  )
}

export default DashBoardPage
