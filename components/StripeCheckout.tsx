'use client'

import { Template } from '@/lib/templates'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import axios from 'axios'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  template: Template
}

export default function StripeCheckout({ template }: Props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/checkout', {
        templateId: template.id,
        templateName: template.name,
        amount: template.price,
        email,
      })

      const { sessionId } = response.data
      const stripe = await stripePromise

      if (!stripe) throw new Error('Stripe failed to load')

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })

      if (stripeError) {
        setError(stripeError.message || 'Checkout failed')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleCheckout} className="bg-white border-2 border-indigo-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Proceed to Checkout</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="you@example.com"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <span>{template.name}</span>
          <span className="font-semibold">${template.price}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-indigo-600">${template.price}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !email}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay $${template.price}`}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secured by Stripe. Your payment information is encrypted and secure.
      </p>
    </form>
  )
}
