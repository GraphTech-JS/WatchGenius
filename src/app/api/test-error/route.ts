import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

/**
 * Test endpoint to trigger a 500 error and verify Sentry integration
 * This endpoint intentionally throws an error to test error monitoring
 * 
 * Usage: GET /api/test-error
 */
export async function GET() {
  try {
    throw new Error('Test 500 error for Sentry monitoring');
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        endpoint: '/api/test-error',
        test: true,
      },
      extra: {
        message: 'This is a test error to verify Sentry integration',
        timestamp: new Date().toISOString(),
      },
    });

    // Return 500 error response
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Test error triggered for Sentry monitoring',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

