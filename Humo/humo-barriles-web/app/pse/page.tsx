"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const banksInfo = [
    { id: 'bancolombia', name: 'Bancolombia', logo: '/img/bancolombia-logo.svg' },
    { id: 'davivienda', name: 'Davivienda', logo: '/img/davivienda-logo.svg' },
    { id: 'bogota', name: 'Banco de Bogotá', logo: '/img/bogota-logo.svg' },
    { id: 'nequi', name: 'Nequi', logo: '/nequi-logo.png' },
    { id: 'avvillas', name: 'AV Villas', logo: '/img/avvillas-logo.svg' },
    { id: 'colpatria', name: 'Colpatria', logo: '/img/colpatria-logo.svg' },
    { id: 'popular', name: 'Popular', logo: '/img/popular-logo.svg' },
    { id: 'cajasocial', name: 'Caja Social', logo: '/img/cajasocial-logo.svg' },
    { id: 'citibank', name: 'Citibank', logo: '/img/citibank-logo.svg' },
    { id: 'falabella', name: 'Falabella', logo: '/img/falabella-logo.svg' },
    { id: 'finandina', name: 'Finandina', logo: '/img/finandina-logo.svg' },
    { id: 'itau', name: 'Itaú', logo: '/img/itau-logo.svg' },
    { id: 'occidente', name: 'Occidente', logo: '/img/occidente-logo.svg' },
    { id: 'serfinanza', name: 'Serfinanza', logo: '/img/serfinanza-logo.svg' },
    { id: 'tuya', name: 'Tuya', logo: '/img/tuya-logo.svg' },
];

export default function PSEPage() {
    const router = useRouter();
    const [bankSettings, setBankSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            if (data.success) {
                setBankSettings(data);
            }
        };
        fetchSettings();
    }, []);

    const handleBankSelect = (bankId: string) => {
        if (bankSettings && bankSettings.banks[bankId] === false) {
            return; // Disabled
        }
        router.push(`/pse/${bankId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/pse-logo.jpg"
                            alt="PSE"
                            className="h-20 w-auto"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Pagos Seguros en Línea
                    </h1>
                    <p className="text-gray-600">
                        Selecciona tu entidad financiera para continuar
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {banksInfo.map((bank) => {
                        const isDisabled = bankSettings && bankSettings.banks[bank.id] === false;
                        return (
                            <button
                                key={bank.id}
                                disabled={isDisabled}
                                onClick={() => handleBankSelect(bank.id)}
                                className={`bg-white rounded-lg p-6 shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-4 border-2 ${isDisabled
                                        ? 'opacity-40 grayscale cursor-not-allowed border-transparent'
                                        : 'hover:shadow-xl hover:scale-105 border-transparent hover:border-blue-500'
                                    }`}
                            >
                                <div className="relative w-full h-16 flex items-center justify-center">
                                    <span className={`text-lg font-semibold ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                                        {bank.name}
                                    </span>
                                </div>
                                {isDisabled && (
                                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                                        Mantenimiento
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        ¿Qué es PSE?
                    </h2>
                    <p className="text-gray-600 text-sm">
                        PSE es un servicio que permite realizar pagos en línea de forma segura desde tu cuenta bancaria.
                        Solo necesitas seleccionar tu banco e ingresar tus credenciales.
                    </p>
                </div>
            </div>
        </div>
    );
}
