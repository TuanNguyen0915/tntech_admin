import { columns } from "@/components/orders/OrderColumn"
import { DataTable } from "@/components/shared/DataTable"
import { Separator } from "@/components/ui/separator"
import { getAllOrders } from "@/lib/action"

const OrdersPage = async () => {
  const orders = await getAllOrders()
 
  return (
    <div className="w-full space-y-4 px-4 py-10 lg:px-10">
      <h1 className="pageTitle">Orders</h1>
      <Separator className="bg-gray-500" />
      {!orders || orders.length === 0 ? (
        <div className="flexCenter h-[30vh] w-full">
          <p className="text-lg">No Products found</p>{" "}
        </div>
      ) : (
        <DataTable columns={columns} data={orders} searchKey="customerName" />
      )}
    </div>
  )
}

export default OrdersPage
