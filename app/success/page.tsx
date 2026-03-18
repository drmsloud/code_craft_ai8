import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Your template has been sent to your email. Check your inbox for the download link.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 inline-block"
          >
            Back to Gallery
          </Link>
          <Link
            href="/admin"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 inline-block"
          >
            View Stats
          </Link>
        </div>
      </div>
    </div>
  )
}
