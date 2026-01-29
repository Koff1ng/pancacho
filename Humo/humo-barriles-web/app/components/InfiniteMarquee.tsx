"use client";

import { motion } from "framer-motion";

export function InfiniteMarquee() {
    return (
        <div className="w-full bg-gold-600 py-3 overflow-hidden whitespace-nowrap relative z-20">
            <motion.div
                className="flex gap-16 items-center"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20,
                }}
            >
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-black font-bebas text-2xl tracking-widest uppercase">
                        HUMO BARRILES - EST. 2020 &nbsp; • &nbsp; LOS INVENCIBLES DE BORNEO &nbsp; • &nbsp; ENVÍOS A TODO COLOMBIA &nbsp; • &nbsp;
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
