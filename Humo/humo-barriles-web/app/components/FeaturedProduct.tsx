"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function FeaturedProduct() {
    return (
        <section className="py-20 bg-neutral-900 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative aspect-square lg:aspect-[4/3] w-full">
                        <div className="absolute inset-0 bg-gold-500/20 blur-[100px] rounded-full" />
                        <Image
                            src="https://www.humobarriles.com/cdn/shop/files/barril38.png"
                            alt="Barril Grande 38LB"
                            fill
                            className="object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Content Side */}
                    <div className="text-center lg:text-left">
                        <span className="block text-gold-500 font-host font-bold tracking-[0.2em] mb-4 uppercase text-sm">
                            El Rey del Asado
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bebas text-white mb-6 uppercase leading-none">
                            Barril Grande <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">38 Libras</span>
                        </h2>
                        <p className="text-neutral-400 font-host text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Diseñado para los verdaderos maestros parrilleros. Capacidad para hasta 30 personas,
                            construcción en acero inoxidable de grado quirúrgico, y un sistema de ventilación
                            optimizado para cocciones perfectas.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <span className="text-4xl font-bebas text-gold-500">
                                $700,000 COP
                            </span>
                            <Link
                                href="/checkout"
                                className="group relative inline-flex items-center gap-3 bg-white text-black py-4 px-8 rounded-full font-host font-bold uppercase tracking-wide hover:bg-gold-500 hover:text-black transition-all"
                            >
                                <span>Comprar Ahora</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
