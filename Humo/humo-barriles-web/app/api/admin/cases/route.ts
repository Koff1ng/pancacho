import { NextRequest, NextResponse } from 'next/server';
import { caseStore } from '@/lib/store';

export async function GET() {
    try {
        const cases = caseStore.getAllCases();
        return NextResponse.json({
            success: true,
            cases
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch cases' }, { status: 500 });
    }
}
