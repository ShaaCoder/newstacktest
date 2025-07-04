import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth-token');

    if (authToken?.value === 'demo-session-token') {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: '1',
          username: 'admin',
          role: 'admin',
        },
      });
    } else {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}