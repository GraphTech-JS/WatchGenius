import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://watchgenius-be-40g2.onrender.com';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get('ids');
    const currency = searchParams.get('currency');

    if (!ids) {
      return NextResponse.json(
        { message: 'Missing ids parameter', error: {} },
        { status: 400 }
      );
    }

    const backendParams = new URLSearchParams();
    backendParams.set('ids', ids);
    if (currency) {
      backendParams.set('currency', currency);
    }

    const backendUrl = `${BACKEND_URL}/api/watches/by-ids?${backendParams.toString()}`;

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

