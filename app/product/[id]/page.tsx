'use client'

import { templates } from '@/lib/templates'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import StripeCheckout from '@/components/StripeCheckout'

export default function ProductPage() {
  const params = useParams()
  const templateId = params.id as string
  const template = templates.find((t) => t.id === templateId)
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)

  if (!template) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
        <Link href="/" className="text-indigo-600 hover:underline">
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Back to Gallery
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: Preview */}
        <div>
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg h-96 flex items-center justify-center">
            <div className="text-6xl">{template.icon}</div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{template.useCase}</p>
          </div>
        </div>

        {/* Right: Details & Checkout */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{template.name}</h1>
          <p className="text-gray-600 mb-6">{template.description}</p>

          {/* Meta */}
          <div className="flex gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Language</p>
              <p className="font-semibold">{template.language}</p>
            </div>
            {template.framework && (
              <div>
                <p className="text-sm text-gray-600">Framework</p>
                <p className="font-semibold">{template.framework}</p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">What's Included</h3>
            <ul className="space-y-2">
              {template.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & CTA */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Price</p>
            <p className="text-4xl font-bold text-indigo-600 mb-6">${template.price}</p>
            <button
              onClick={() => setShowCheckout(!showCheckout)}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {showCheckout ? 'Close' : 'Buy Now'}
            </button>
          </div>

          {/* Checkout */}
          {showCheckout && <StripeCheckout template={template} />}

          {/* Info */}
          <div className="border-t border-gray-200 pt-6 text-sm text-gray-600">
            <p className="mb-2">✓ Instant digital delivery via email</p>
            <p className="mb-2">✓ Source code included</p>
            <p>✓ Free updates and support</p>
          </div>
        </div>
      </div>
    </main>
  )
}
