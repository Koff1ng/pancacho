"use client";

import { useState, useEffect } from "react";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Navigation } from "./Navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { totalItems, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
                    isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-white/10" : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Left: Hamburger */}
                    <button
                        onClick={() => setIsNavOpen(true)}
                        className="flex items-center gap-3 group"
                    >
                        <Menu className="w-8 h-8 text-white group-hover:text-gold-500 transition-colors" />
                        <span className="hidden sm:block text-sm font-bold tracking-widest text-white group-hover:text-gold-500 transition-colors uppercase">
                            Navegación
                        </span>
                    </button>

                    {/* Center: Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                        <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                            <Image
                                src="https://www.humobarriles.com/cdn/shop/files/LOGO_HUMO_BARRILES.png?v=1731101080&width=425"
                                alt="Humo Barriles Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="text-white hover:text-gold-500 transition-colors uppercase font-host text-sm hidden sm:block">
                            Buscar
                        </button>
                        <button
                            onClick={toggleCart}
                            className="relative text-white hover:text-gold-500 transition-colors group"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        </>
    );
}
