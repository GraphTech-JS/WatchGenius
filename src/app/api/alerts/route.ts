import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://watchgenius-be-40g2.onrender.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const backendUrl = `${BACKEND_URL}/api/alerts`;
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('❌ [API] API Route Error (alerts):', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: {} },
      { status: 500 }
    );
  }
}