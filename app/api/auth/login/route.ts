import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Simple demo authentication
    // In production, use proper password hashing and database validation
    if (username === 'shaan' && password === 'shaan@6569') {
      const response = NextResponse.json({
        success: true,
        user: {
          id: '1',
          username: 'shaan',
          role: 'admin',
        },
      });

      // Set a simple session cookie
      response.cookies.set('auth-token', 'demo-session-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}