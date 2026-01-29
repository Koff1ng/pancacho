"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartPanel() {
    const { items, totalItems, subtotal, isOpen, toggleCart, updateQuantity, removeFromCart } = useCart();

    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-neutral-100 px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-gold-600" />
                                <h2 className="text-xl font-bold text-black">Carrito ({totalItems})</h2>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-neutral-700" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
                                    <p className="text-neutral-500 text-lg">Tu carrito está vacío</p>
                                    <button
                                        onClick={toggleCart}
                                        className="mt-6 bg-gold-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-gold-600 transition-colors"
                                    >
                                        Ir a comprar
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-20 h-20 bg-white rounded-lg flex-shrink-0 p-2">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-black text-sm mb-1 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gold-600 font-bold text-lg">
                                                    ${item.price.toLocaleString('es-CO')}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 bg-white border border-neutral-300 rounded hover:bg-neutral-100 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4 text-neutral-700" />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold text-black">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 bg-white border border-neutral-300 rounded hover:bg-neutral-100 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4 text-neutral-700" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 h-fit hover:bg-red-100 rounded-full transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer - Summary */}
                        {items.length > 0 && (
                            <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-neutral-700">
                                        <span>Subtotal - {totalItems} artículo{totalItems > 1 ? 's' : ''}</span>
                                        <span className="font-semibold">
                                            ${subtotal.toLocaleString('es-CO')}.00
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-neutral-700">
                                        <div className="flex items-center gap-2">
                                            <span>Envío</span>
                                            <span className="text-xs text-neutral-400">ⓘ</span>
                                        </div>
                                        <span className="text-green-600 font-semibold">GRATIS</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-neutral-300">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-bold text-black">Total</span>
                                        <span className="text-2xl font-bold text-gold-600">
                                            COP ${total.toLocaleString('es-CO')}.00
                                        </span>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        onClick={toggleCart}
                                        className="block w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-4 rounded-lg text-center transition-colors uppercase tracking-wide"
                                    >
                                        Ir al checkout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
