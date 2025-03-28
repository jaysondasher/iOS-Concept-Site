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

            // Format date like "Thursday, March 21"
            const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
            setDate(now.toLocaleDateString('en-US', options));
        };


        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`ios-status-bar text-white ${isMobile ? 'pt-2' : 'pt-1'} z-10`}
            data-time={time}
        >
            {isMobile ? (
                // iPhone status bar (simplified - actual icons are added via CSS)
                <div className="w-full opacity-0">
                    <div className="font-semibold">{time}</div>
                </div>
            ) : (
                // iPad status bar
                <div className="w-full flex flex-col items-center">
                    <div className="text-xs text-center opacity-80">{date}</div>
                    <div className="flex justify-between items-center w-full px-4 pt-1">
                        <div className="font-semibold">{time}</div>
                        <div className="flex gap-2 items-center">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                            </svg>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="6" width="18" height="12" rx="2" />
                                <line x1="7" y1="10" x2="7" y2="14" />
                                <line x1="11" y1="8" x2="11" y2="16" />
                                <line x1="15" y1="6" x2="15" y2="18" />
                                <line x1="19" y1="8" x2="19" y2="16" />
                            </svg>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
                                <line x1="22" y1="11" x2="22" y2="13" />
                                <line x1="6" y1="11" x2="6" y2="13" />
                                <line x1="10" y1="11" x2="10" y2="13" />
                                <line x1="14" y1="11" x2="14" y2="13" />
                                <line x1="18" y1="11" x2="18" y2="13" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusBar; 