import Stripe from "stripe"

export const stripe = new Stripe(
  process.env.STRIPE_WEBHOOKS_SECRET_KEY as string,
  {
    typescript: true,
  },
)
