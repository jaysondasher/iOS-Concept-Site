import React, { useEffect, useState } from 'react';

interface StatusBarProps {
    isMobile: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ isMobile }) => {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        // Update time initially and every minute
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            setTime(`${formattedHours}:${formattedMinutes}`);

            // Format date like "Monday, January 1"
            const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
            setDate(now.toLocaleDateString('en-US', options));
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`ios-status-bar text-white ${isMobile ? 'pt-2' : 'pt-1'}`}>
            {isMobile ? (
                // iPhone status bar with notch
                <div className="w-full flex items-center">
                    <div className="flex-1">
                        <div className="text-center font-semibold">{time}</div>
                    </div>
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-10"></div>
                    <div className="flex gap-1.5 items-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.01 21.49L23.64 7C23.19 6.66 18.71 3 12 3C5.28 3 0.81 6.66 0.36 7L12.01 21.49Z" />
                        </svg>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                        </svg>
                    </div>
                </div>
            ) : (
                // iPad status bar
                <div className="w-full flex flex-col items-center">
                    <div className="text-xs text-center opacity-80">{date}</div>
                    <div className="flex justify-between items-center w-full px-4 pt-1">
                        <div className="font-semibold">{time}</div>
                        <div className="flex gap-2 items-center">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.01 21.49L23.64 7C23.19 6.66 18.71 3 12 3C5.28 3 0.81 6.66 0.36 7L12.01 21.49Z" />
                            </svg>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusBar; 