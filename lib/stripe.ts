import Stripe from "stripe"

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_WEBHOOKS_SECRET_KEY as string,
  {
    typescript: true,
  },
)
