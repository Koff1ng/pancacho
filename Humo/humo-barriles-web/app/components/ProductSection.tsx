"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Barril Grande 38LB",
        price: "$790.000",
        image: "https://www.humobarriles.com/cdn/shop/files/barril38.png?v=1762980885&width=4134",
        description: "Para los verdaderos maestros del asado."
    },
    {
        id: 2,
        name: "Barril Mediano 28LB",
        price: "$619.000",
        image: "https://www.humobarriles.com/cdn/shop/files/barril28.png?v=1768340838&width=4134",
        description: "El equilibrio perfecto para tu familia."
    },
    {
        id: 3,
        name: "Barril Super Mini 08LB",
        price: "$490.000",
        image: "https://www.humobarriles.com/cdn/shop/files/barril08lb.png?v=1762980392&width=4134",
        description: "Compacto y poderoso para cualquier lugar."
    },
];

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ProductSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [
        Autoplay({ delay: 4000, stopOnInteraction: true })
    ]);
    const { addToCart } = useCart();

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id="invencibles" className="py-20 bg-neutral-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                        Los Invencibles <span className="text-gold-500">de Borneo</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Equipos diseñados para durar y transformar tus asados en experiencias legendarias.
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-8">
                            {products.map((product, index) => (
                                <div className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_31%] min-w-0" key={product.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group/card relative bg-black/50 border-none overflow-hidden rounded-[20px] h-full"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-80 overflow-hidden bg-black/40">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-4 transition-transform duration-700 group-hover/card:scale-110"
                                            />
                                            {/* Removing generic 'Nuevo' badge to match clean look */}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 text-center">
                                            <h3 className="text-3xl font-bebas text-white mb-2 uppercase tracking-wide group-hover/card:text-gold-500 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-neutral-400 text-sm font-host mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-center gap-4">
                                                <span className="text-2xl font-bold font-host text-gold-500">
                                                    {product.price}
                                                </span>
                                                <button
                                                    onClick={() => addToCart({
                                                        id: product.id,
                                                        name: product.name,
                                                        price: parseInt(product.price.replace(/[$.]/g, '')),
                                                        image: product.image
                                                    })}
                                                    className="bg-white text-black p-3 rounded-full hover:bg-gold-500 hover:scale-110 transition-all active:scale-95"
                                                >
                                                    <ShoppingCart className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 bg-black/50 hover:bg-gold-500 p-3 rounded-full text-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm border border-white/10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 bg-black/50 hover:bg-gold-500 p-3 rounded-full text-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm border border-white/10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-16 text-center">
                    <Link href="#" className="inline-block border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold uppercase tracking-widest py-3 px-8 transition-all">
                        Ver Todos Los Productos
                    </Link>
                </div>
            </div>
        </section>
    );
}
