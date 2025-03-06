'use client';

import React, { useEffect, useState } from 'react';
import HomeScreen from '@/components/HomeScreen';

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <main className="min-h-screen">
            <div className={`mx-auto ${isMobile ? 'mobile-device' : 'tablet-device'}`}>
                <HomeScreen isMobile={isMobile} />
            </div>
        </main>
    );
} 