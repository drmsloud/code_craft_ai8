import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo (in production, use a database)
const emails: string[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    if (emails.includes(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    // Add to storage
    emails.push(email)

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully subscribed! Check your email for your 20% discount code.',
        email 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Email subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    totalSubscribers: emails.length,
    emails: emails // In production, don't expose email list
  })
}
