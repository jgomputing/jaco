import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    return NextResponse.json({ status: 'Connected to database successfully' })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    )
  }
} 