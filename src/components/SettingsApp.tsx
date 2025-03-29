import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSettings } from '@/hooks/useSettings';

interface SettingsAppProps {
    onClose: () => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ onClose }) => {
    const { settings, toggleDarkMode, changeWallpaper } = useSettings();
    const [mounted, setMounted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Technologies used in this project
    const technologies = [
        { name: 'Next.js', version: '14.0.4' },
        { name: 'React', version: '18.2.0' },
        { name: 'TypeScript', version: '5.0.4' },
        { name: 'Tailwind CSS', version: '3.3.0' },
    ];

    // Version history
    const versionHistory = [
        { version: '1.0', date: 'March 29, 2024', changes: ['Initial release'] },
        { version: '1.1', date: 'March 30, 2024', changes: ['Added Settings app', 'Improved UI responsiveness'] },
    ];

    // Mock storage data for visualization
    const storageData = [
        { label: 'Images', usage: 86, total: 100, color: '#34C759' },
        { label: 'Documents', usage: 45, total: 100, color: '#007AFF' },
        { label: 'System', usage: 74, total: 100, color: '#FF9500' },
        { label: 'Apps', usage: 62, total: 100, color: '#AF52DE' },
    ];

    useEffect(() => {
        setMounted(true);
        // Ensure body doesn't scroll when settings is open
        document.body.style.overflow = 'hidden';

        // Check if dark mode is enabled
        setIsDarkMode(settings.darkMode);

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [settings.darkMode]);

    // Handle wallpaper change with feedback
    const handleWallpaperChange = useCallback((wallpaperPath: string) => {
        changeWallpaper(wallpaperPath);
        setFeedbackMessage('Wallpaper updated!');

        // Clear feedback message after 2 seconds
        const timer = setTimeout(() => {
            setFeedbackMessage('');
        }, 2000);

        // Clear timeout on component unmount
        return () => clearTimeout(timer);
    }, [changeWallpaper]);

    // Get random image
    const getRandomImage = useCallback(() => {
        const timestamp = new Date().getTime(); // Add timestamp to prevent caching
        handleWallpaperChange(`https://picsum.photos/2560/1440?t=${timestamp}`);
    }, [handleWallpaperChange]);

    // Get wallpaper display name - memoized to avoid recalculation on each render
    const getWallpaperName = useCallback(() => {
        if (!settings.wallpaper) return 'Default';

        if (settings.wallpaper.includes('picsum.photos')) {
            return 'Random (Picsum)';
        } else if (settings.wallpaper === '/SequoiaLight.png') {
            return 'Sequoia Light';
        } else if (settings.wallpaper === '/images/F02_Mac.png') {
            return 'F02 Mac';
        } else if (settings.wallpaper === '/images/Mountain02_Mac.png') {
            return 'Mountain Mac';
        }
        return 'Custom';
    }, [settings.wallpaper]);

    // Move search handling to an event handler
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    if (!mounted) return null;

    // Capture wallpaper name once to avoid recalculation during render
    const wallpaperName = getWallpaperName();

    return (
        <div className="ios-settings-modal">
            {/* Mobile-only header - HIGHLY VISIBLE */}
            <div
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: 0,
                    right: 0,
                    height: '44px',
                    backgroundColor: isDarkMode ? 'rgba(28, 28, 30, 0.95)' : 'rgba(242, 242, 247, 0.95)',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                className="md:hidden" /* Hide on desktop */
            >
                <button
                    onClick={onClose}
                    style={{
                        color: isDarkMode ? '#2196ff' : '#007aff',
                        fontSize: '18px',
                        fontWeight: 700,
                        background: 'none',
                        border: 'none',
                        padding: '8px 12px',
                        margin: 0,
                        minWidth: '70px'
                    }}
                >
                    Done
                </button>
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: isDarkMode ? '#ffffff' : '#000000'
                    }}
                >
                    Settings
                </div>
            </div>

            <div className="ios-settings-container">
                {/* Spacer div to push content below header on mobile only */}
                <div className="md:hidden" style={{ height: '45px' }}></div>

                {/* Regular header (visible on desktop) */}
                <header className="ios-settings-header ios-settings-desktop-only">
                    <button
                        onClick={onClose}
                        className={`ios-settings-done-btn ${isDarkMode ? 'ios-settings-done-btn-dark' : ''}`}
                        style={{ textShadow: "0 0 0 rgba(255,255,255,0.5)" }}
                    >
                        Done
                    </button>
                    <h1 className="ios-settings-title">Settings</h1>
                    <div className="ios-settings-spacer"></div>
                </header>

                {/* Search */}
                <div className="ios-settings-search-container" style={{ marginTop: '0px' }}>
                    <div className="ios-settings-search-inner">
                        <div className="ios-settings-search-icon">
                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="ios-settings-search-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Content - Scrollable Area */}
                <div className="ios-settings-content">
                    {/* User Profile Section */}
                    <div className="ios-settings-section">
                        <div className="ios-settings-card">
                            <div className="ios-settings-user-profile">
                                <div className="ios-settings-avatar">
                                    <div className="ios-settings-avatar-inner">
                                        J
                                    </div>
                                </div>
                                <div className="ios-settings-user-info">
                                    <div className="ios-settings-user-name">User Account</div>
                                    <div className="ios-settings-user-subtitle">Portfolio Site Demo</div>
                                </div>
                                <div className="ios-settings-chevron">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Settings Section */}
                    <div className="ios-settings-section">
                        <div className="ios-settings-section-title">Visual Settings</div>
                        <div className="ios-settings-card">
                            {/* Dark Mode Toggle */}
                            <div className="ios-settings-row ios-settings-row-border">
                                <div className="ios-settings-row-icon" style={{ backgroundColor: '#8B8D90' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.06 1.06l1.591 1.591a.75.75 0 001.06-1.06l-1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                    </svg>
                                </div>
                                <span className="ios-settings-row-label">Dark Mode</span>
                                <label className="ios-settings-switch">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={settings.darkMode}
                                        onChange={toggleDarkMode}
                                    />
                                    <div className="ios-settings-switch-track"></div>
                                </label>
                            </div>

                            {/* Wallpaper */}
                            <div className="ios-settings-row">
                                <div className="ios-settings-row-icon" style={{ backgroundColor: '#5AC8FA' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ios-settings-row-label">Wallpaper</span>
                                <div className="ios-settings-row-value">
                                    <span className="ios-settings-row-value-text">{wallpaperName}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ios-settings-chevron-small" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Wallpaper Selection Subview */}
                        <div className="ios-settings-card ios-settings-mt">
                            <div className="ios-settings-wallpaper-preview">
                                <Image
                                    src={settings.wallpaper}
                                    alt="Current wallpaper"
                                    fill
                                    className="object-cover"
                                    unoptimized={settings.wallpaper.includes('picsum.photos')}
                                />
                            </div>

                            <div className="ios-settings-wallpaper-grid">
                                <button
                                    onClick={() => handleWallpaperChange('/SequoiaLight.png')}
                                    className={`ios-settings-wallpaper-item ${settings.wallpaper === '/SequoiaLight.png' ? 'ios-settings-wallpaper-selected' : ''}`}
                                >
                                    <Image src="/SequoiaLight.png" alt="Default Wallpaper" fill className="object-cover" />
                                    {settings.wallpaper === '/SequoiaLight.png' && (
                                        <div className="ios-settings-wallpaper-check">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleWallpaperChange('/images/F02_Mac.png')}
                                    className={`ios-settings-wallpaper-item ${settings.wallpaper === '/images/F02_Mac.png' ? 'ios-settings-wallpaper-selected' : ''}`}
                                >
                                    <Image src="/images/F02_Mac.png" alt="F02 Wallpaper" fill className="object-cover" />
                                    {settings.wallpaper === '/images/F02_Mac.png' && (
                                        <div className="ios-settings-wallpaper-check">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleWallpaperChange('/images/Mountain02_Mac.png')}
                                    className={`ios-settings-wallpaper-item ${settings.wallpaper === '/images/Mountain02_Mac.png' ? 'ios-settings-wallpaper-selected' : ''}`}
                                >
                                    <Image src="/images/Mountain02_Mac.png" alt="Mountain Wallpaper" fill className="object-cover" />
                                    {settings.wallpaper === '/images/Mountain02_Mac.png' && (
                                        <div className="ios-settings-wallpaper-check">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={getRandomImage}
                                className="ios-settings-random-wallpaper-btn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                </svg>
                                Random Wallpaper
                            </button>

                            {/* Feedback message */}
                            {feedbackMessage && (
                                <div className="ios-settings-feedback">
                                    {feedbackMessage}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Technical Section */}
                    <div className="ios-settings-section">
                        <div className="ios-settings-section-title">Technical</div>
                        <div className="ios-settings-card">
                            {/* Site Technologies */}
                            <div className="ios-settings-row ios-settings-row-border">
                                <div className="ios-settings-row-icon" style={{ backgroundColor: '#FF9500' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l.97-.97H7.5a.75.75 0 010-1.5h.69l-.97-.97a.75.75 0 010-1.06zm10.56 0a.75.75 0 10-1.06 0l-.97.97h-.69a.75.75 0 000 1.5h.69l.97.97a.75.75 0 101.06-1.06l-2.25-2.25a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06l-.97-.97h-.69a.75.75 0 010-1.5h.69l.97-.97a.75.75 0 000-1.06z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ios-settings-row-label">Site Technologies</span>
                                <div className="ios-settings-chevron">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Site Technologies Detail Section */}
                            <div className="ios-settings-detail-section">
                                <ul className="ios-settings-tech-list">
                                    {technologies.map((tech, index) => (
                                        <li key={index} className="ios-settings-tech-item">
                                            <span className="ios-settings-tech-name">{tech.name}</span>
                                            <span className="ios-settings-tech-version">{tech.version}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Version History */}
                            <div className="ios-settings-row ios-settings-row-border">
                                <div className="ios-settings-row-icon" style={{ backgroundColor: '#007AFF' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ios-settings-row-label">Version History</span>
                                <div className="ios-settings-chevron">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Version History Detail */}
                            <div className="ios-settings-detail-section">
                                {versionHistory.map((version, index) => (
                                    <div key={index} className="ios-settings-version-item">
                                        <div className="ios-settings-version-header">
                                            <span className="ios-settings-version-number">Version {version.version}</span>
                                            <span className="ios-settings-version-date">{version.date}</span>
                                        </div>
                                        <ul className="ios-settings-version-changes">
                                            {version.changes.map((change, changeIndex) => (
                                                <li key={changeIndex}>{change}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Storage */}
                            <div className="ios-settings-row">
                                <div className="ios-settings-row-icon" style={{ backgroundColor: '#34C759' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ios-settings-row-label">Storage (Demo)</span>
                                <div className="ios-settings-row-value">
                                    <span className="ios-settings-row-value-text">268.5 GB / 512 GB</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ios-settings-chevron-small" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Storage Detail */}
                            <div className="ios-settings-detail-section">
                                <div className="ios-settings-storage-bar">
                                    <div
                                        className="ios-settings-storage-bar-fill"
                                        style={{ width: '52%' }}
                                    ></div>
                                </div>

                                <div className="ios-settings-storage-items">
                                    {storageData.map((item, index) => (
                                        <div key={index} className="ios-settings-storage-item">
                                            <div className="ios-settings-storage-color" style={{ backgroundColor: item.color }}></div>
                                            <div className="ios-settings-storage-details">
                                                <div className="ios-settings-storage-header">
                                                    <span className="ios-settings-storage-name">{item.label}</span>
                                                    <span className="ios-settings-storage-size">{item.usage} GB</span>
                                                </div>
                                                <div className="ios-settings-storage-bar-small">
                                                    <div
                                                        className="ios-settings-storage-bar-fill-small"
                                                        style={{
                                                            width: `${(item.usage / item.total) * 100}%`,
                                                            backgroundColor: item.color
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Safe area bottom spacer */}
                    <div className="ios-settings-safe-area-bottom"></div>
                </div>
            </div>
        </div>
    );
};

export default SettingsApp; 