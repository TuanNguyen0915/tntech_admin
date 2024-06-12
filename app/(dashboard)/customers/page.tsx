import { columns } from "@/components/customers/CustomerColumn"
import { DataTable } from "@/components/shared/DataTable"
import { Separator } from "@/components/ui/separator"
import { getAllCustomers } from "@/lib/action"
import { ICustomer } from "@/lib/types"

const CustomerPage = async () => {
  const customers = (await getAllCustomers()) as ICustomer[]
  return (
    <div className="w-full space-y-4 px-4 py-10 lg:px-10">
      <h1 className="pageTitle">Customers</h1>
      <Separator className="bg-gray-500" />
      {!customers || customers.length === 0 ? (
        <div className="flexCenter h-[30vh] w-full">
          <p className="text-lg">No Products found</p>{" "}
        </div>
      ) : (
        <DataTable columns={columns} data={customers} searchKey="name" />
      )}
    </div>
  )
}

export default CustomerPage
