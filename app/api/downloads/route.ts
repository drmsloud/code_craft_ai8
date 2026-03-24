import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// Map template IDs to their ZIP file names
const TEMPLATE_FILES: Record<string, string> = {
  'react-admin-dashboard': 'React TypeScript Dashboard',
  'vue3-ecommerce': 'Vue 3 E-Commerce',
  'fastapi-boilerplate': 'Python FastAPI Backend',
  'nodejs-rest-api': 'Node.js Express API',
  'typescript-utility-library': 'TypeScript Utility Library',
  'nextjs-saas-starter': 'Next.js Full-Stack',
  'graphql-server': 'NestJS Enterprise Backend',
  'django-rest-framework': 'Django REST Framework',
  'react-native-starter': 'Real-Time Chat App',
  'tailwind-components': 'AI Chatbot Boilerplate',
}

export async function GET(request: NextRequest) {
  try {
    const templateId = request.nextUrl.searchParams.get('templateId')
    
    if (!templateId || !TEMPLATE_FILES[templateId]) {
      return NextResponse.json(
        { error: 'Invalid template ID' },
        { status: 400 }
      )
    }

    // For MVP: Return a mock ZIP or redirect to GitHub releases
    // In production, this would serve from S3 with presigned URLs
    
    // Mock response: Return a success message with download info
    return NextResponse.json({
      success: true,
      templateName: TEMPLATE_FILES[templateId],
      message: 'Download link has been emailed to you',
      downloadUrl: `https://github.com/drmsloud/code-craft-ai/releases/download/templates/${templateId}.zip`,
      expiresIn: '24 hours',
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    )
  }
}
