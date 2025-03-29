import React from 'react';
import Image from 'next/image';
import AppIcon from './AppIcon';
import { ProfileWidget } from './Widget';
import StatusBar from './StatusBar';
import AppGrid from './AppGrid';
import { useAppData } from '@/hooks/useAppData';

// Dock apps (commonly used apps in iOS)
const dockApps = [
    {
        name: 'GitHub',
        icon: '/icons/ios/github-ios.svg',
        url: 'https://github.com/jaysondasher',
        color: 'transparent'
    },
    {
        name: 'LinkedIn',
        icon: '/icons/ios/linkedin-ios.svg',
        url: 'https://www.linkedin.com/in/jayson-dasher',
        color: 'transparent'
    },
    {
        name: 'Mail',
        icon: '/icons/ios/mail-ios.svg',
        url: 'mailto:jayson@simplifygolf.app',
        color: 'transparent'
    },
    {
        name: 'Resume',
        icon: '/icons/ios/resume-ios.svg',
        url: '/resume.pdf',
        color: 'transparent'
    }
];

interface HomeScreenProps {
    isMobile: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isMobile }) => {
    const { apps, loading, error } = useAppData();

    return (
        <div className="h-full w-full relative">
            {/* Wallpaper */}
            <Image
                src="/SequoiaLight.png"
                alt="iOS Wallpaper"
                fill
                className="ios-wallpaper"
                priority
                sizes="100vw"
            />

            {/* Status Bar */}
            <StatusBar isMobile={isMobile} />

            {/* Content Container */}
            <div className="p-4 sm:p-8 relative z-10 h-full">
                {/* Profile Widget */}
                <div className={`mb-8 ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
                    <ProfileWidget />
                </div>

                {/* App Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-pulse text-white opacity-70">Loading apps...</div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="text-red-400">{error}</div>
                    </div>
                ) : (
                    <AppGrid apps={apps} isMobile={isMobile} />
                )}
            </div>

            {/* Dock */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-[50]">
                <div className="ios-dock">
                    <div className="flex gap-6 sm:gap-10">
                        {dockApps.map((app, index) => (
                            <AppIcon
                                key={index}
                                name={app.name}
                                icon={app.icon}
                                url={app.url}
                                color={app.color}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen; 