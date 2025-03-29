import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AppIconProps {
    name: string;
    icon: string;
    url: string;
    color?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ name, icon, url, color = '#ffffff' }) => {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 w-16 sm:w-20"
        >
            <div
                className="ios-app-icon w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center rounded-[22%] shadow-md overflow-hidden"
                style={{
                    backgroundColor: color,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
            >
                {icon.startsWith('/') ? (
                    <Image
                        src={icon}
                        alt={name}
                        width={60}
                        height={60}
                        className={`${icon.includes('/ios/') ? 'w-full h-full object-cover' : 'w-3/5 h-3/5 object-contain'}`}
                    />
                ) : (
                    <span className="text-2xl sm:text-3xl">{icon}</span>
                )}
            </div>
            <span className="text-xs text-center mt-1 font-medium text-white text-shadow">{name}</span>
        </Link>
    );
};

export default AppIcon; 