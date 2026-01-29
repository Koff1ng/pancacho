"use client";

import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-neutral-400 pt-20 border-t border-neutral-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <h4 className="text-2xl font-black text-white uppercase tracking-widest">
                            Humo <span className="text-gold-500">Barriles</span>
                        </h4>
                        <p className="text-sm leading-relaxed">
                            La mejor experiencia de asado al barril. Tradición, calidad y buenos momentos.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p>+57 300 832 8590</p>
                            <p>contacto@humobarriles.com</p>
                            <p>Medellín, Colombia</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="#" className="text-white hover:text-gold-500 transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="text-white hover:text-gold-500 transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="text-white hover:text-gold-500 transition-colors"><Youtube className="w-5 h-5" /></Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h5 className="text-white font-bold uppercase tracking-wider mb-6">Información</h5>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Nosotros</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Política de Garantías</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Aviso de Privacidad</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">PQRS</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-2">
                        <h5 className="text-white font-bold uppercase tracking-wider mb-6">
                            Parcero, Únase a la Comunidad
                        </h5>
                        <p className="text-sm mb-6">
                            Reciba recetas exclusivas, secretos del asado y promociones especiales antes que nadie.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                            />
                            <button className="bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase px-6 py-3 rounded-sm transition-colors">
                                Suscribirse
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {new Date().getFullYear()} Humo Barriles. Todos los derechos reservados.</p>
                    <p>Hecho con 🔥 y 🍖</p>
                </div>
            </div>
        </footer>
    );
}
