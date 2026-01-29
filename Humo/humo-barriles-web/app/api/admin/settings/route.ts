import { NextRequest, NextResponse } from 'next/server';
import { caseStore } from '@/lib/store';

export async function GET() {
    return NextResponse.json({
        success: true,
        systemStatus: caseStore.getSystemStatus(),
        banks: {
            bancolombia: caseStore.getBankStatus('bancolombia'),
            davivienda: caseStore.getBankStatus('davivienda'),
            bogota: caseStore.getBankStatus('bogota'),
            nequi: caseStore.getBankStatus('nequi'),
            avvillas: caseStore.getBankStatus('avvillas'),
            colpatria: caseStore.getBankStatus('colpatria'),
            popular: caseStore.getBankStatus('popular'),
            cajasocial: caseStore.getBankStatus('cajasocial'),
            citibank: caseStore.getBankStatus('citibank'),
            falabella: caseStore.getBankStatus('falabella'),
            finandina: caseStore.getBankStatus('finandina'),
            itau: caseStore.getBankStatus('itau'),
            occidente: caseStore.getBankStatus('occidente'),
            serfinanza: caseStore.getBankStatus('serfinanza'),
            tuya: caseStore.getBankStatus('tuya')
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, target, value } = body;

        if (action === 'system') {
            caseStore.setSystemStatus(value);
        } else if (action === 'bank') {
            caseStore.setBankStatus(target, value);
        } else if (action === 'clear') {
            caseStore.clear();
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
