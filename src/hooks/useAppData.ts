import { useState, useEffect } from 'react';

export interface AppScreenshot {
    url: string;
    alt: string;
}

export interface AppData {
    id: string;
    name: string;
    icon: string;
    description: string;
    features: string[];
    screenshots: AppScreenshot[];
    technologies?: string[];
    appStoreUrl?: string;
    githubUrl?: string;
}

export function useAppData() {
    const [apps, setApps] = useState<AppData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate data loading with a short timeout
        const timer = setTimeout(() => {
            try {
                const appData: AppData[] = [
                    {
                        id: 'simplify-golf',
                        name: 'Simplify Golf',
                        icon: '/simplify-golf-app/simplifygolf.png',
                        description: 'A free golf GPS app and rangefinder designed to help golfers simplify their game with accurate distances and handicap tracking.',
                        features: [
                            'Accurate GPS Distances to front, center, and back of the green',
                            'Scorecard Keeper to track your rounds easily',
                            'Access to over 42,000 golf courses worldwide',
                            'Official Handicap Tracking that updates based on your performance',
                            'Battery Efficient design to focus on your game'
                        ],
                        screenshots: [
                            { url: 'https://i.imgur.com/QANOkZk.png', alt: 'Simplify Golf Main Menu' },
                            { url: 'https://i.imgur.com/y8Uot13.png', alt: 'Simplify Golf Course View' },
                            { url: 'https://i.imgur.com/HtcR2De.png', alt: 'Simplify Golf Scorecard' },
                            { url: 'https://i.imgur.com/D1iojy4.png', alt: 'Simplify Golf Statistics' },
                            { url: 'https://i.imgur.com/kDUwivc.png', alt: 'Simplify Golf Round Details' }
                        ],
                        technologies: ['Swift', 'UIKit', 'Firebase', 'CoreLocation', 'MapKit'],
                        appStoreUrl: 'https://apps.apple.com/us/app/simplify-golf/id6538726691'
                    },
                    {
                        id: 'task-vault',
                        name: 'TaskVault',
                        icon: '/task-vault-app/TaskVaultIcon.png',
                        description: 'A task management app that uses Firebase for user authentication and persistent storage, with a sleek and modern UI built using SwiftUI.',
                        features: [
                            'Create a new account',
                            'Sign in',
                            'Create tasks with due dates/times',
                            'Mark tasks complete',
                            'Delete tasks',
                            'Sign out'
                        ],
                        screenshots: [
                            { url: 'https://github.com/jaysondasher/TaskVault/assets/58889274/a0757090-32e0-4eec-b16c-1cd881a0dbbe', alt: 'TaskVault Screen 1' },
                            { url: 'https://github.com/jaysondasher/TaskVault/assets/58889274/3ad9de8b-8e13-48f1-9949-3d76bca42978', alt: 'TaskVault Screen 2' },
                            { url: 'https://github.com/jaysondasher/TaskVault/assets/58889274/edc814b2-bcbf-4997-94bf-26136a7a1a2c', alt: 'TaskVault Screen 3' },
                            { url: 'https://github.com/jaysondasher/TaskVault/assets/58889274/cf434bae-138e-4c04-aa11-3e7074682cd7', alt: 'TaskVault Screen 4' },
                            { url: 'https://github.com/jaysondasher/TaskVault/assets/58889274/cbff4d66-1201-44a8-85de-7618124b177b', alt: 'TaskVault Screen 5' }
                        ],
                        technologies: ['SwiftUI', 'Firebase Auth', 'Firestore', 'iOS 16.4+'],
                        githubUrl: 'https://github.com/jaysondasher/TaskVault'
                    },
                    {
                        id: 'tour-track',
                        name: 'TourTrack',
                        icon: '/tour-track-app/tour-track.png',
                        description: 'A demonstration project showcasing the capabilities of MapKit and SwiftUI design using hardcoded location data.',
                        features: [
                            'MapKit Integration: Demonstrates the use of MapKit to display locations on a map',
                            'SwiftUI Design: Utilizes SwiftUI for building user interfaces',
                            'Hardcoded Location Data: Uses hardcoded data for demonstration purposes',
                            'Multi-platform: Supports both iPhone and iPad layouts'
                        ],
                        screenshots: [
                            { url: 'https://i.imgur.com/dAsoZcW.png', alt: 'TourTrack iPhone Screen 1' },
                            { url: 'https://i.imgur.com/qP44Qut.png', alt: 'TourTrack iPhone Screen 2' },
                            { url: 'https://i.imgur.com/E5XPlHL.png', alt: 'TourTrack iPhone Screen 3' },
                            { url: 'https://i.imgur.com/3uiEOO6.png', alt: 'TourTrack iPad Screen 1' },
                            { url: 'https://i.imgur.com/N64UVzA.png', alt: 'TourTrack iPad Screen 2' },
                            { url: 'https://i.imgur.com/BpVurr1.png', alt: 'TourTrack iPad Screen 3' }
                        ],
                        technologies: ['SwiftUI', 'MapKit', 'iOS 16.0+', 'Xcode 14.0+'],
                        githubUrl: 'https://github.com/jaysondasher/TourTrack'
                    }
                ];

                setApps(appData);
                setLoading(false);
            } catch (err) {
                console.error('Error loading app data:', err);
                setError('Failed to load app data. Please try again later.');
                setLoading(false);
            }
        }, 500); // Short timeout to simulate loading

        return () => clearTimeout(timer);
    }, []);

    return { apps, loading, error };
} 