import { useState, useEffect, useCallback } from 'react';

interface Settings {
    darkMode: boolean;
    wallpaper: string;
}

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>({
        darkMode: false,
        wallpaper: '/SequoiaLight.png',
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load settings from localStorage on mount
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        const storedWallpaper = localStorage.getItem('wallpaper') || '/SequoiaLight.png';

        setSettings({
            darkMode: storedDarkMode,
            wallpaper: storedWallpaper,
        });

        // Apply dark mode to document
        if (storedDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        setIsLoaded(true);

        // Listen for wallpaper changes from the settings app
        const handleWallpaperChange = (event: CustomEvent) => {
            const { wallpaper } = event.detail;
            setSettings(prev => ({ ...prev, wallpaper }));
        };

        window.addEventListener('wallpaper-changed', handleWallpaperChange as EventListener);

        return () => {
            window.removeEventListener('wallpaper-changed', handleWallpaperChange as EventListener);
        };
    }, []);

    // Toggle dark mode
    const toggleDarkMode = useCallback(() => {
        setSettings(prev => {
            const newDarkMode = !prev.darkMode;
            localStorage.setItem('darkMode', newDarkMode.toString());

            if (newDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            return { ...prev, darkMode: newDarkMode };
        });
    }, []);

    // Change wallpaper
    const changeWallpaper = useCallback((wallpaper: string) => {
        // First update local state and localStorage
        setSettings(prev => {
            localStorage.setItem('wallpaper', wallpaper);
            return { ...prev, wallpaper };
        });

        // Use requestAnimationFrame to dispatch the event after the current render cycle
        requestAnimationFrame(() => {
            const event = new CustomEvent('wallpaper-changed', {
                detail: { wallpaper }
            });
            window.dispatchEvent(event);
        });
    }, []);

    return {
        settings,
        isLoaded,
        toggleDarkMode,
        changeWallpaper
    };
}; 