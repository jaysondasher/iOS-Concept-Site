import React, { useState } from 'react';
import Image from 'next/image';
import { AppData } from '@/hooks/useAppData';
import AppModal from './AppModal';

// Define a custom app type that can have an onClick handler
export interface CustomApp {
    id: string;
    name: string;
    icon: string;
    color?: string;
    onClick?: () => void;
}

interface AppGridProps {
    apps: (AppData | CustomApp)[];
    isMobile: boolean;
}

const AppGrid: React.FC<AppGridProps> = ({ apps, isMobile }) => {
    const [selectedApp, setSelectedApp] = useState<AppData | null>(null);

    const handleAppClick = (app: AppData | CustomApp) => {
        // If app has onClick handler, call it
        if ('onClick' in app && app.onClick) {
            app.onClick();
            return;
        }

        // Otherwise treat it as a regular app and show modal
        // We check for properties unique to AppData to ensure it's the right type
        if ('description' in app && 'features' in app && 'screenshots' in app) {
            setSelectedApp(app as AppData);
        }
    };

    const closeModal = () => {
        setSelectedApp(null);
    };

    return (
        <>
            <div className={`grid ${isMobile ? 'grid-cols-4 gap-4' : 'grid-cols-6 gap-6'} mt-8`}>
                {apps.map((app) => (
                    <div
                        key={app.id}
                        className="flex flex-col items-center justify-center gap-1"
                        onClick={() => handleAppClick(app)}
                    >
                        <div
                            className="ios-app-icon relative w-16 h-16 sm:w-20 sm:h-20 rounded-[22%] overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                            style={{
                                backgroundColor: 'color' in app ? app.color || 'transparent' : 'transparent'
                            }}
                        >
                            <Image
                                src={app.icon}
                                alt={app.name}
                                fill
                                className="object-cover"
                                sizes={isMobile ? "64px" : "80px"}
                            />
                        </div>
                        <span className="text-xs text-center mt-1 font-medium text-white text-shadow">
                            {app.name}
                        </span>
                    </div>
                ))}
            </div>

            {selectedApp && (
                <AppModal app={selectedApp} onClose={closeModal} />
            )}
        </>
    );
};

export default AppGrid; 