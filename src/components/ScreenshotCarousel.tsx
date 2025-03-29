import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AppScreenshot } from '@/hooks/useAppData';

interface ScreenshotCarouselProps {
    screenshots: AppScreenshot[];
}

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ screenshots }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesPerView, setImagesPerView] = useState(3);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Determine how many images to show based on screen width
    useEffect(() => {
        const updateImagesPerView = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setImagesPerView(1);
            } else if (width < 1024) {
                setImagesPerView(2);
            } else {
                setImagesPerView(3);
            }
        };

        updateImagesPerView();
        window.addEventListener('resize', updateImagesPerView);
        return () => window.removeEventListener('resize', updateImagesPerView);
    }, []);

    // Calculate the maximum valid index based on images per view
    const maxIndex = Math.max(0, screenshots.length - imagesPerView);

    const goToPrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(Math.min(maxIndex, slideIndex));
    };

    // If there are no screenshots, don't render the carousel
    if (screenshots.length === 0) {
        return null;
    }

    // Calculate visible screenshots
    const visibleScreenshots = screenshots.slice(currentIndex, currentIndex + imagesPerView);

    // Calculate indices for pagination dots
    const paginationIndices = [];
    const step = Math.ceil(screenshots.length / 6); // Limit to 6 dots max

    for (let i = 0; i <= maxIndex; i += step) {
        paginationIndices.push(i);
    }

    // If the last index is not included and there are more screenshots
    if (paginationIndices[paginationIndices.length - 1] !== maxIndex && maxIndex > 0) {
        paginationIndices.push(maxIndex);
    }

    return (
        <div className="relative w-full mb-8 group" ref={carouselRef}>
            {/* Screenshot strip */}
            <div className="w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                <div className="relative h-80 flex transition-transform duration-500 ease-in-out">
                    {visibleScreenshots.map((screenshot, index) => (
                        <div
                            key={currentIndex + index}
                            className={`flex-shrink-0 w-full md:w-1/${imagesPerView} px-1 sm:px-2`}
                            style={{ width: `${100 / imagesPerView}%` }}
                        >
                            <div className="relative h-full w-full rounded-lg overflow-hidden">
                                <Image
                                    src={screenshot.url}
                                    alt={screenshot.alt}
                                    fill
                                    className="object-contain"
                                    sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${100 / imagesPerView}vw`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls - only show if there are more screenshots than can fit in the view */}
            {screenshots.length > imagesPerView && (
                <>
                    {/* Left Arrow */}
                    <button
                        className={`absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 cursor-pointer ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
                            } transition-opacity shadow-lg z-10`}
                        onClick={goToPrevious}
                        disabled={currentIndex === 0}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        className={`absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 cursor-pointer ${currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
                            } transition-opacity shadow-lg z-10`}
                        onClick={goToNext}
                        disabled={currentIndex >= maxIndex}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots - only show if there are multiple pages */}
                    {paginationIndices.length > 1 && (
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {paginationIndices.map((pageIndex) => (
                                <button
                                    key={pageIndex}
                                    onClick={() => goToSlide(pageIndex)}
                                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${currentIndex === pageIndex ? 'bg-gray-800 dark:bg-white' : 'bg-gray-400/50 hover:bg-gray-600/70 dark:bg-white/50 dark:hover:bg-white/70'
                                        }`}
                                    aria-label={`Go to slide ${pageIndex + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Counter */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10">
                        {currentIndex + 1}-{Math.min(currentIndex + imagesPerView, screenshots.length)} of {screenshots.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default ScreenshotCarousel; 