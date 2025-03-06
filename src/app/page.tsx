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
        <main className="min-h-screen w-full flex items-center justify-center">
            {/* Site background - only visible on desktop */}
            {!isMobile && <div className="site-background"></div>}

            {isMobile ? (
                <div className="mobile-container">
                    {/* Northern lights effects outside the frame - hidden on mobile */}
                    <div className="mobile-glow"></div>
                    <div className="mobile-aurora-top"></div>
                    <div className="mobile-aurora-right"></div>
                    <div className="mobile-aurora-bottom"></div>
                    <div className="mobile-aurora-left"></div>

                    {/* Mobile status bar and notch */}
                    <div className="mobile-status-bar"></div>
                    <div className="mobile-notch"></div>

                    {/* Actual mobile device - full screen on mobile */}
                    <div className="mobile-device">
                        <div className="mobile-screen">
                            <HomeScreen isMobile={true} />
                        </div>
                        <div className="mobile-home-indicator"></div>
                    </div>
                </div>
            ) : (
                <div className="ipad-container">
                    {/* Northern lights effects outside the frame */}
                    <div className="ipad-glow"></div>
                    <div className="aurora-top"></div>
                    <div className="aurora-right"></div>
                    <div className="aurora-bottom"></div>
                    <div className="aurora-left"></div>

                    {/* Actual iPad device */}
                    <div className="tablet-device">
                        <div className="volume-button"></div>
                        <div className="tablet-screen">
                            <HomeScreen isMobile={false} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
} 