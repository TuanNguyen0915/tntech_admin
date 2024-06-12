import Customer from "@/lib/database/models/Customer.model"
import Order from "@/lib/database/models/Order.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOKS_SECRET_KEY as string,
    )
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const customerInfo = {
        clerkId: session.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      }
      const shippingAddress = {
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        state: session?.shipping_details?.address?.state,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      }
      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items.data.price.product"],
        },
      )
      const lineItems = retrieveSession?.line_items?.data
      const orderItems = lineItems?.map((item: any) => {
        return {
          product: item.price.product.metadata.productId,
          color: item.price.product.metadata.color || "N/A",
          size: item.price.product.metadata.size || "N/A",
          quantity: item.quantity,
        }
      })
      await connectToDB()
      //TODO: Create new order
      const newOrder = await Order.create({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress,
        shippingRate: session?.shipping_cost?.shipping_rate,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      })
      //TODO: Add order._id to existing customer, create new customer otherwise
      let customer = await Customer.findOne({ clerkId: customerInfo.clerkId })
      if (customer) {
        customer.orders.push(newOrder._id)
        await customer.save()
      } else {
        customer = await Customer.create({
          ...customerInfo,
          orders: [newOrder._id],
        })
      }
      return NextResponse.json(
        { success: true, order: newOrder, customer },
        { status: 200 },
      )
    }
  } catch (error) {
    console.log("webhooks_post", error)
    return NextResponse.json(
      { message: "Failed to create the order" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
