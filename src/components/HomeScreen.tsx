import React from 'react';
import Image from 'next/image';
import AppIcon from './AppIcon';
import { ProfileWidget } from './Widget';
import StatusBar from './StatusBar';

// Sample project data (to be replaced with real data later)
const projects = [
    {
        name: 'Project 1',
        icon: '🚀',
        url: 'https://example.com/project1',
        color: '#FF3B30'
    },
    {
        name: 'Project 2',
        icon: '💻',
        url: 'https://example.com/project2',
        color: '#34C759'
    },
    {
        name: 'Project 3',
        icon: '🎮',
        url: 'https://example.com/project3',
        color: '#007AFF'
    },
    {
        name: 'Project 4',
        icon: '📱',
        url: 'https://example.com/project4',
        color: '#5856D6'
    },
    {
        name: 'Project 5',
        icon: '🎨',
        url: 'https://example.com/project5',
        color: '#FF9500'
    },
    {
        name: 'Project 6',
        icon: '🔍',
        url: 'https://example.com/project6',
        color: '#AF52DE'
    }
];

// Dock apps (commonly used apps in iOS)
const dockApps = [
    {
        name: 'GitHub',
        icon: '🐙',
        url: 'https://github.com/yourusername',
        color: '#333333'
    },
    {
        name: 'LinkedIn',
        icon: '🔗',
        url: 'https://linkedin.com/in/yourusername',
        color: '#0077B5'
    },
    {
        name: 'Email',
        icon: '✉️',
        url: 'mailto:your.email@example.com',
        color: '#1D76F2'
    },
    {
        name: 'Resume',
        icon: '📄',
        url: '/resume.pdf',
        color: '#FF2D55'
    }
];

interface HomeScreenProps {
    isMobile: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isMobile }) => {
    return (
        <div className="h-full w-full relative overflow-auto">
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
                <div className={`grid ${isMobile ? 'grid-cols-4 gap-4' : 'grid-cols-6 gap-8'} mt-8`}>
                    {projects.map((project, index) => (
                        <AppIcon
                            key={index}
                            name={project.name}
                            icon={project.icon}
                            url={project.url}
                            color={project.color}
                        />
                    ))}
                </div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
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