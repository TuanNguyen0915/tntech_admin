import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json()
    if (!cartItems || !customer) {
      return NextResponse.json(
        { success: false, message: "Missing data" },
        { status: 400 },
      )
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        { shipping_rate: "shr_1PONxlKsTQoH0E00mlCElEEr" },
        { shipping_rate: "shr_1PONxHKsTQoH0E000D3NfEyo" },
        { shipping_rate: "shr_1PONy9KsTQoH0E008RAqCWqq" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: Math.round(cartItem.item.price * 100),
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    })
    return NextResponse.json(
      { success: true, session },
      { headers: corsHeaders },
    )
  } catch (error) {
    console.log("Checkout_POST", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
