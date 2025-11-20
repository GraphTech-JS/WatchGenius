import { NextResponse } from 'next/server';

const BACKEND_URL = 'https://watchgenius-be-40g2.onrender.com';


export class BaseApiService {
    protected baseUrl: string;

    constructor(baseUrl: string = BACKEND_URL) {
        this.baseUrl = baseUrl;
    }


     protected getCorsHeaders() {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  protected async fetchFromBackend(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response>{
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch( url, {
        ...options,
        headers:{
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    return response;
  }


  protected async handleApiRequest<T>(
    endpoint: string,
    options: RequestInit ={},
  ): Promise<NextResponse<T>> {
    try {
        const response = await this.fetchFromBackend(endpoint, options);

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
            headers: this.getCorsHeaders()
        });

    }catch(error){
        console.error('API Route Error:', error);
    }

   return NextResponse.json(
        { message: 'Internal Server Error', error: {} } as T,
        { 
          status: 500, 
          headers: this.getCorsHeaders(),
        }
      );
  }

  protected createErrorResponse(
    message: string, 
    status: number = 400 
  ): NextResponse {
    return NextResponse.json(
      { message, error: {} },
      {
        status, 
        headers: this.getCorsHeaders(),
      }
    );
  }
}