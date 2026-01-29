import { NextRequest, NextResponse } from 'next/server';
import { caseStore } from '@/lib/store';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || status === undefined) {
            return NextResponse.json({ success: false, error: 'Missing ID or status' }, { status: 400 });
        }

        caseStore.updateCaseStatus(id, status);

        return NextResponse.json({
            success: true,
            message: `Status updated to ${status}`
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
    }
}
