"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105"
                style={{
                    backgroundImage: "url('https://www.humobarriles.com/cdn/shop/files/BARRIL-MAS-VENDIDO-28LB-BANNER_e553be05-9ef7-4b25-ab59-6f3b1a693ad1.jpg?v=1767884324&width=3350')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="block text-gold-500 text-sm sm:text-base font-bold tracking-[0.2em] mb-4 uppercase font-host">
                        Est. 2020
                    </span>
                    <h1 className="text-[48px] sm:text-[80px] md:text-[128px] font-bebas leading-[0.9] text-white tracking-tighter mb-8 max-w-5xl mx-auto shadow-black drop-shadow-lg">
                        LOS INVENCIBLES <br /> DE BORNEO
                    </h1>

                    <button
                        onClick={() => {
                            document.getElementById('invencibles')?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }}
                        className="group relative inline-flex items-center gap-3 bg-black/50 backdrop-blur-md text-white border border-white/20 py-[22px] px-[28px] rounded-[60px] font-host uppercase font-medium tracking-wide hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300 cursor-pointer"
                    >
                        <span className="relative z-10">¡Cómprelo Pueees!</span>
                        <div className="bg-white/20 p-2 rounded-full group-hover:bg-black/10 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
            </motion.div>
        </section>
    );
}
