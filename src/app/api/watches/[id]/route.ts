import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://watchgenius-be-40g2.onrender.com';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const currency = searchParams.get('currency');

    if (!id) {
      return NextResponse.json(
        { message: 'Missing id parameter', error: {} },
        { status: 400 }
      );
    }

    const backendUrl = currency
      ? `${BACKEND_URL}/api/watches/${id}?currency=${currency}`
      : `${BACKEND_URL}/api/watches/${id}`;

    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
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
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: {} },
      { status: 500 }
    );
  }
}

