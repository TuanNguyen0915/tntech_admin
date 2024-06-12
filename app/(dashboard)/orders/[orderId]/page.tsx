import { columns } from "@/components/orders/orderDetails/OrderItemsColumn"
import { DataTable } from "@/components/shared/DataTable"
import { Separator } from "@/components/ui/separator"
import { getOrderById } from "@/lib/action"

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await getOrderById(params.orderId)
  const order = res.order,
    customer = res.order.customer,
    orderDate = new Date(order?.createdAt).toLocaleString()


  return (
    <div className="w-full space-y-4 px-4 py-10 lg:px-10">
      <h1 className="pageTitle">Order Details</h1>
      <Separator className="bg-gray-500" />
      <div className="w-full space-y-4">
        <p className="text-xl font-semibold">
          Order ID: <span className="font-normal">{order?._id}</span>
        </p>
        <p className="text-lg font-semibold">
          Customer Name: <span className="font-normal">{customer?.name}</span>
        </p>
        <p className="text-lg font-semibold">
          Shipping Address:{" "}
          <span className="font-normal">
            {order?.shippingAddress.st} {order?.shippingAddress.city}{" "}
            {order?.shippingAddress.state} {order?.shippingAddress.postalCode}
          </span>
        </p>
        <p className="text-xl font-semibold">
          Total pay: <span className="font-normal">${order?.totalAmount}</span>
        </p>
        <p className="text-xl font-semibold">
          Shipping Rate:{" "}
          <span className="font-normal">{order.shippingRate}</span>
        </p>
        <p className="text-xl font-semibold">
          Date order: <span className="font-normal">{orderDate}</span>
        </p>
        <div className="w-full">
          <DataTable columns={columns} searchKey="title" data={order?.products} />
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
