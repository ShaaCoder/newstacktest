import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Query from '@/lib/models/Query';
export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, company, message } = body;

    const newQuery = new Query({
      name,
      email,
      company: company || undefined,
      message,
      status: 'new',
    });

    await newQuery.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you soon!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}