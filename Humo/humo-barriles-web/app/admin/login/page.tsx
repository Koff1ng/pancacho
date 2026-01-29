"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (password === 'isla0109$$') {
            // Set simple cookie for session
            document.cookie = "admin_session=OK; path=/; max-age=3600";
            router.push('/admin');
        } else {
            setError('Contraseña incorrecta');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-gray-900/95 border border-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
                <img
                    src="/losdelaisla.svg"
                    alt="Los de la isla"
                    className="w-full max-w-[300px] mx-auto mb-8"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />

                <h1 className="text-white text-2xl font-bold mb-8 uppercase tracking-widest">
                    Acceso Administrativo
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                        className="w-full max-w-[280px] bg-gray-800 text-white px-5 py-3 rounded-lg border border-gray-700 focus:border-yellow-500 outline-none mb-4 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full max-w-[280px] bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-700 text-gray-900 font-bold py-3 rounded-lg transition-all shadow-lg"
                    >
                        {isLoading ? 'Verificando...' : 'Ingresar'}
                    </button>
                    {error && (
                        <p className="mt-4 text-red-500 font-medium">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
