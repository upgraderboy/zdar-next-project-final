"use client"

import { Check, X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { trpc } from '@/trpc/client'

const plans = [
  {
    name: "Free",
    key: "FREE",
    description: "Best for personal use",
    price: "$0",
    billing: "forever",
    buttonText: "Start for Free",
    features: ["1 user", "5 projects", "2GB storage", "Basic support"],
  },
  {
    name: "Basic",
    key: "MONTHLY",
    description: "Perfect for small teams",
    price: "$19",
    billing: "per month",
    buttonText: "Subscribe Monthly",
    paymentLink: process.env.STRIPE_MONTHLY_PLAN_LINK || "https://buy.stripe.com/test_8wM4ifak6gmQfo47ss",
    features: ["5 users", "20 projects", "10GB storage", "Priority support", "Advanced analytics"],
  },
  {
    name: "Premium",
    key: "YEARLY",
    description: "For larger businesses",
    price: "$199",
    billing: "per year",
    buttonText: "Subscribe Yearly",
    paymentLink: process.env.STRIPE_YEARLY_PLAN_LINK || "https://buy.stripe.com/test_bIY9Cz8bY6Mgb7O5kl",
    features: ["Unlimited users", "Unlimited projects", "100GB storage", "24/7 support", "Custom integrations", "Advanced security"],
  },
]

export default function PricingTable() {
  const { user } = useUser()
  const { data: billingPortalUrl } = trpc.companies.getBillingPortalUrl.useQuery()

  // Get publicMetadata from Clerk
  const publicMetadata = user?.publicMetadata || {}
  const isSubscribed = publicMetadata?.isSubscribed === true
  const currentPlan = publicMetadata?.plan // "MONTHLY" | "YEARLY" | undefined

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h2>
      <div className="mx-6 md:mx-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = plan.key === currentPlan

          let buttonContent

          if (!user) {
            buttonContent = (
              <Button className="w-full">
                <Link href="/auth/login">Login to Subscribe</Link>
              </Button>
            )
          } else if (isSubscribed && isCurrentPlan && plan.key !== "FREE") {
            buttonContent = (
              <Button className="w-full" variant="outline">
                <Link href={billingPortalUrl || "#"}>Manage Billing</Link>
              </Button>
            )
          } else if (plan.key === "FREE") {
            buttonContent = (
              <Button className="w-full" variant="outline">
                <Link href="/">Start Free</Link>
              </Button>
            )
          } else {
            buttonContent = (
              <Button className="w-full">
                <Link href={plan.paymentLink || "#"}>{plan.buttonText}</Link>
              </Button>
            )
          }

          return (
            <Card key={plan.name} className="flex flex-col text-center">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-4xl font-bold mb-2">
                  {plan.price}
                  <span className="text-sm font-normal text-muted-foreground">/{plan.billing}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="w-fit mx-auto flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>{buttonContent}</CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}