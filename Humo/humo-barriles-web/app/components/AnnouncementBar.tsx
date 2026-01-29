"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
    return (
        <div className="bg-gold-500 text-black py-2 overflow-hidden whitespace-nowrap z-50 relative">
            <motion.div
                className="flex gap-8 items-center font-bold uppercase text-xs tracking-widest"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 15,
                }}
            >
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="flex items-center gap-8">
                        ENVÍOS A TODO COLOMBIA  •  ENVÍO GRATIS POR COMPRAS SUPERIORES A $200.000  •  CALIDAD GARANTIZADA  •
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
