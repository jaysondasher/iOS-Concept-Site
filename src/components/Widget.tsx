import React from 'react';
import Image from 'next/image';

interface WidgetProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`ios-monochrome-widget ${className}`}>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">{title}</h3>
            <div className="widget-content">{children}</div>
        </div>
    );
};

export const ProfileWidget: React.FC = () => {
    return (
        <Widget title="About Me" className="max-w-md">
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <Image
                        src="/jayson.jpeg"
                        alt="Jayson Dasher"
                        fill
                        className="object-cover"
                        style={{ objectPosition: "center 0px", objectFit: "cover", transform: "scale(1.05)" }}
                    />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Jayson Dasher</h2>
                    <p className="text-sm text-gray-600">
                        iOS Developer
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Building beautiful digital experiences
                    </p>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-700">
                I develop intuitive and engaging user experiences for iOS platforms.
                My focus is on creating applications that are both functional and enjoyable to use,
                with attention to detail and clean design principles.
            </p>
        </Widget>
    );
};

export default Widget; 