"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
    {
        title: "BARRILES BASE",
        image: "https://www.humobarriles.com/cdn/shop/files/barril08lb.png",
        link: "/collections/barriles-base"
    },
    {
        title: "COMBOS HUMO",
        image: "https://www.humobarriles.com/cdn/shop/files/COMBO28NAVIDENO.jpg",
        link: "/collections/combos-humo"
    },
    {
        title: "COMBOS BORNEO",
        image: "https://www.humobarriles.com/cdn/shop/files/NuevaVersion2.jpg",
        link: "/collections/combos-borneo"
    },
    {
        title: "ACCESORIOS",
        image: "https://www.humobarriles.com/cdn/shop/files/PORTADASDECPOMBOSFLOWBARRILERO-07.jpg",
        link: "/collections/accesorios"
    }
];

export function CollectionList() {
    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bebas text-center text-white mb-12 uppercase tracking-wide">
                    Nuestras Colecciones
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection, index) => (
                        <Link
                            key={index}
                            href={collection.link}
                            className="group block relative aspect-[3/4] overflow-hidden rounded-[20px] bg-neutral-900"
                        >
                            <Image
                                src={collection.image}
                                alt={collection.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-0 right-0 text-center p-4">
                                <h3 className="text-2xl font-bebas text-white uppercase tracking-wider group-hover:text-gold-500 transition-colors">
                                    {collection.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
