import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const registro = request.cookies.get('registro')?.value;

        if (!registro) {
            return NextResponse.json({ status: 0 });
        }

        const estado = request.cookies.get('estado')?.value || '1';

        return NextResponse.json({
            status: parseInt(estado),
            registro
        });

    } catch (error) {
        console.error('Error in estado:', error);
        return NextResponse.json({ status: 0 });
    }
}
