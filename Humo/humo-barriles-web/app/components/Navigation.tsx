"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: "Barriles", href: "#" },
    { name: "Accesorios", href: "#" },
    { name: "Combos", href: "#" },
    { name: "Borneo", href: "#" },
    { name: "Recetas", href: "#" },
    { name: "Trabaja con nosotros", href: "#" },
    { name: "Encuentranos", href: "#" },
];

export function Navigation({ isOpen, onClose }: NavigationProps) {
    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-neutral-900 border-r border-white/10 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-white/10">
                            <span className="text-xl font-bold tracking-wider text-white">MENÚ</span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-6">
                            <ul className="space-y-2 px-4">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center justify-between p-4 text-neutral-300 hover:text-gold-500 hover:bg-white/5 rounded-lg transition-all group"
                                            onClick={onClose}
                                        >
                                            <span className="font-medium text-lg">{item.name}</span>
                                            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-500" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="p-6 border-t border-white/10">
                            <Link
                                href="#"
                                className="block w-full py-4 text-center bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider rounded transition-colors"
                            >
                                Ver Catálogo
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
