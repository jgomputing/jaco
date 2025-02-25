import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Get file extension
    const originalName = file.name
    const ext = originalName.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    // Save to public/uploads directory
    const path = join(process.cwd(), 'public/uploads', fileName)
    await writeFile(path, buffer)

    // Return the URL
    const url = `/uploads/${fileName}`
    
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
} 