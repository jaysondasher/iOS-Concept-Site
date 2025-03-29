import React, { useState } from 'react';
import Image from 'next/image';
import { AppData } from '@/hooks/useAppData';
import AppModal from './AppModal';

interface AppGridProps {
    apps: AppData[];
    isMobile: boolean;
}

const AppGrid: React.FC<AppGridProps> = ({ apps, isMobile }) => {
    const [selectedApp, setSelectedApp] = useState<AppData | null>(null);

    const handleAppClick = (app: AppData) => {
        setSelectedApp(app);
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