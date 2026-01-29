"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Using the actual logo extracted or a placeholder if slight variation needed.
// Based on site, they use the head logo.
const LOGO_URL = "https://www.humobarriles.com/cdn/shop/files/LOGO_HUMO_BARRILES.png?v=1731101080&width=425";

export function LogoMarquee() {
    return (
        <div className="bg-black py-10 border-t border-white/10 border-b border-white/10 overflow-hidden">
            <motion.div
                className="flex gap-24 items-center"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                }}
            >
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="relative w-32 h-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <Image
                            src={LOGO_URL}
                            alt="Humo Barriles"
                            fill
                            className="object-contain"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
