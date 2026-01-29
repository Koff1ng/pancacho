import { NextRequest, NextResponse } from 'next/server';
import { caseStore } from '@/lib/store';

export async function GET(request: NextRequest) {
    try {
        const registro = request.cookies.get('registro')?.value;

        if (!registro) {
            return NextResponse.json({ status: 0 });
        }

        // Check if there's a specific status in our store for this record
        const record = caseStore.getCase(parseInt(registro));
        const status = record ? record.status : parseInt(request.cookies.get('estado')?.value || '1');

        return NextResponse.json({
            status,
            registro
        });

    } catch (error) {
        console.error('Error in estado:', error);
        return NextResponse.json({ status: 0 });
    }
}
